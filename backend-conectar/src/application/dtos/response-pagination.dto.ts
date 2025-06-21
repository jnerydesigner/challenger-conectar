export interface PaginationResponseDTO {
  users: UserDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserDto {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
