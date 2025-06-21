export interface PaginationResponseDTO {
  users: UserTypes[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserTypes {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}
