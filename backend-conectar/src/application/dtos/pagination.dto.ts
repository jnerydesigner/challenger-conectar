export type PaginationQueryDTO = {
  page: string;
  limit: string;
  direction: 'ASC' | 'DESC';
  field?: string;
  role?: 'admin' | 'user' | '';
};
