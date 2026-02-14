import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Notification } from '@app-types/firebase.types';

interface NotificationState {
    notifications: Notification[];
    unreadCount: number;

    // Actions
    setNotifications: (notifications: Notification[]) => void;
    addNotification: (notification: Notification) => void;
    markAsRead: (notificationId: string) => void;
    markAllAsRead: () => void;
    deleteNotification: (notificationId: string) => void;
    clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>()(
    immer((set) => ({
        notifications: [],
        unreadCount: 0,

        setNotifications: (notifications) =>
            set((state) => {
                state.notifications = notifications;
                state.unreadCount = notifications.filter(n => !n.isRead).length;
            }),

        addNotification: (notification) =>
            set((state) => {
                state.notifications.unshift(notification);
                if (!notification.isRead) {
                    state.unreadCount += 1;
                }
            }),

        markAsRead: (notificationId) =>
            set((state) => {
                const notification = state.notifications.find(n => n.id === notificationId);
                if (notification && !notification.isRead) {
                    notification.isRead = true;
                    state.unreadCount -= 1;
                }
            }),

        markAllAsRead: () =>
            set((state) => {
                state.notifications.forEach(n => {
                    n.isRead = true;
                });
                state.unreadCount = 0;
            }),

        deleteNotification: (notificationId) =>
            set((state) => {
                const index = state.notifications.findIndex(n => n.id === notificationId);
                if (index >= 0) {
                    const notification = state.notifications[index];
                    if (!notification.isRead) {
                        state.unreadCount -= 1;
                    }
                    state.notifications.splice(index, 1);
                }
            }),

        clearAll: () =>
            set((state) => {
                state.notifications = [];
                state.unreadCount = 0;
            }),
    }))
);
