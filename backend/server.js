import express from 'express';
import myEnv from './config/env.js';
const app = express();

const PORT = myEnv.PORT;
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});