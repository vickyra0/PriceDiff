import type { WishlistItem } from '@/types/wishlist';

export function hasWishlistItem(
  items: WishlistItem[],
  userId: string,
  productId: string,
): boolean {
  return items.some((item) => item.userId === userId && item.productId === productId);
}
