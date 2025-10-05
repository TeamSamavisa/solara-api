class PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export class PaginatedResponse<T> {
  content: T[];
  pagination: PaginationMeta;
}
