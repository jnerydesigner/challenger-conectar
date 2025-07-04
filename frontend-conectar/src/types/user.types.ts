export interface PaginationResponseDTO {
  users: UserTypes[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserTypes extends UserProps {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role?: string;
  providerId?: string | null;
  pictureProvider?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserProps {
  token?: string;
}
