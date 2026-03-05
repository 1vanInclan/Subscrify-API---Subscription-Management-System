export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  region: string;
  createdAt: Date | string;
}
