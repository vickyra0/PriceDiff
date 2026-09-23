import { simulateLatency } from '@/services/api/delay';
import type { NotificationService } from '@/services/contracts';
import { mockDb } from '@/services/mock/db';

export const mockNotificationService: NotificationService = {
  async getNotifications(userId) {
    await simulateLatency();
    return mockDb
      .getState()
      .notifications.filter((item) => item.userId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async markRead(id) {
    await simulateLatency(80);
    const current = mockDb.getState().notifications.find((item) => item.id === id);
    if (!current) {
      throw { message: 'Notification not found.', status: 404 };
    }
    const updated = { ...current, isRead: true };
    mockDb.setState({
      notifications: mockDb.getState().notifications.map((item) => (item.id === id ? updated : item)),
    });
    return updated;
  },
  async markAllRead(userId) {
    await simulateLatency(80);
    mockDb.setState({
      notifications: mockDb.getState().notifications.map((item) =>
        item.userId === userId ? { ...item, isRead: true } : item,
      ),
    });
  },
  async deleteNotification(id) {
    await simulateLatency(80);
    mockDb.setState({
      notifications: mockDb.getState().notifications.filter((item) => item.id !== id),
    });
  },
  async addNotification(notification) {
    mockDb.setState({ notifications: [notification, ...mockDb.getState().notifications] });
    return notification;
  },
};
