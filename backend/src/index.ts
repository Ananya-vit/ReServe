import express from 'express';
import cors from 'cors';
import myEnv from './config/env.js';
import { prisma } from './lib/prisma.js';
const app = express();
const PORT = myEnv.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

app.get('/api/user', (req: express.Request, res: express.Response) => {
  res.json({ message: 'Welcome to the API!' });
});
app.post('/api/user', async (req: express.Request, res: express.Response) => {
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice0@prisma.io",
    }
  });
  console.log("Created user:", user);
  res.json({ message: 'User created successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});