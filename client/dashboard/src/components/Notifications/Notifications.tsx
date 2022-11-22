import { useNotificationStore } from '@/store/notifications';
import { useEffect } from 'react';
import { Notification } from './Notification';

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotificationStore();

  useEffect(() => {
    const timedNotification = setTimeout(() =>
      notifications.forEach(notification => {
        dismissNotification(notification.id);
      })
      , 5000);
    return () => clearTimeout(timedNotification);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  return (
    <div
      aria-live="assertive"
      className="z-50 flex flex-col fixed inset-0 space-y-4 items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
    >
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
        />
      ))}
    </div>
  );
};