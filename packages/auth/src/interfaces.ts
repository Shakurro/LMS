export interface UserProfile {
  id: string;
  email: string;
  name: string;
  department?: string;
  managerId?: string;
  roles: string[];
}

export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface MicrosoftAuthConfig {
  clientId: string;
  clientSecret: string;
  tenantId: string;
  authority: string;
  redirectUri: string;
} 