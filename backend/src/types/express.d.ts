import "express-serve-static-core";

declare global {
  namespace Express {
    interface UserPayload {
      userId: number;
      email: string;
      role: string;
      type: string;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}

export {};
