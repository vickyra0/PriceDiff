import type { AppNotification, NotificationType } from '@/types/notification';
import { createId } from '@/utils/cn';

export function createNotification(input: {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  productId?: string;
}): AppNotification {
  return {
    id: createId('ntf'),
    userId: input.userId,
    type: input.type,
    title: input.title,
    message: input.message,
    productId: input.productId,
    isRead: false,
    createdAt: new Date().toISOString(),
  };
}
