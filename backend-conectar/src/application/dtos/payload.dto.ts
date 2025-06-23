export interface PayloadDTO {
  sub: number;
  username: string;
  role: string;
  name: string;
  iat?: number;
  providerId?: string;
  avatar?: string;
}
