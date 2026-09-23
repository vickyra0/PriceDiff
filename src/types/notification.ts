export type NotificationType =
  | 'price_drop'
  | 'target_reached'
  | 'wishlist_update'
  | 'tracking_started'
  | 'system';

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  productId?: string;
  isRead: boolean;
  createdAt: string;
}
