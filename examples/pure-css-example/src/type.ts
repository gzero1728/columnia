export interface User extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
}
