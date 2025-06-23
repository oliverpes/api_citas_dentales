// src/types/express-request.d.ts
import { UserPayload } from '../middlewares/auth';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload;
  }
}
