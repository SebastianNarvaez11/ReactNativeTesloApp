export interface IAuthResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

export type IAuthStatus = 'authenticated' | 'unauthenticated' | 'checking';
