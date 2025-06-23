export type Role = 'admin' | 'recepcionista';

export interface User {
  id: number;
  username: string;
  passwordHash: string;
  role: Role;
}

export const users: User[] = [];
