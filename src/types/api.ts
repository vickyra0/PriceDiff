export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export function isApiError(value: unknown): value is ApiError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    typeof (value as { message: unknown }).message === 'string'
  );
}

export function toApiError(error: unknown, fallback = 'Something went wrong. Please try again.'): ApiError {
  if (isApiError(error)) {
    return error;
  }
  if (error instanceof Error && error.message) {
    return { message: fallback, code: 'UNEXPECTED' };
  }
  return { message: fallback, code: 'UNKNOWN' };
}
