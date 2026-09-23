import { simulateLatency } from '@/services/api/delay';
import type { WishlistService } from '@/services/contracts';
import { mockDb } from '@/services/mock/db';
import type { WishlistItem } from '@/types/wishlist';
import { createId } from '@/utils/cn';
import { getLowestPrice } from '@/utils/price.utils';
import { hasWishlistItem } from '@/utils/wishlist.utils';

export const mockWishlistService: WishlistService = {
  async getWishlist(userId) {
    await simulateLatency();
    return mockDb.getState().wishlist.filter((item) => item.userId === userId);
  },
  async addToWishlist(userId, productId) {
    await simulateLatency();
    const { wishlist, products } = mockDb.getState();
    if (hasWishlistItem(wishlist, userId, productId)) {
      return wishlist.find((item) => item.userId === userId && item.productId === productId)!;
    }
    const product = products.find((item) => item.id === productId);
    const entry: WishlistItem = {
      id: createId('wish'),
      userId,
      productId,
      addedAt: new Date().toISOString(),
      addedPrice: product ? getLowestPrice(product.offers) : null,
    };
    mockDb.setState({ wishlist: [entry, ...wishlist] });
    return entry;
  },
  async removeFromWishlist(userId, productId) {
    await simulateLatency(120);
    mockDb.setState({
      wishlist: mockDb.getState().wishlist.filter(
        (item) => !(item.userId === userId && item.productId === productId),
      ),
    });
  },
};
