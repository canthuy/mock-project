export interface User {
  name: string;
  email: string;
  password?: string;
  location: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  location: string;
}
