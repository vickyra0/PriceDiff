import { toApiError } from '@/types/api';

export async function runQuery<T>(fn: () => Promise<T>) {
  try {
    return { data: await fn() };
  } catch (error) {
    return { error: toApiError(error) };
  }
}
