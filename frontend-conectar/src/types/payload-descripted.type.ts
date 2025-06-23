export interface PayloadDecrypted {
  sub: number;
  username: string;
  name: string;
  role: string;
  providerId: string;
  avatar: string;
  iat: number;
  exp: number;
}
