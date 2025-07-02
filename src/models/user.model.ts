export type Role = 'superadmin' | 'admin' | 'recepcionista';

export interface User {
  id: number;
  username: string;
  passwordHash: string;
  role: Role;
  created_by?: number | null;
}