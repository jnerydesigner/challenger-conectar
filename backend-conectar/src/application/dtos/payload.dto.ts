export interface PayloadDTO {
  sub: number;
  username: string;
  role: string;
  iat?: number;
  providerId?: string;
  avatar?: string;
}
