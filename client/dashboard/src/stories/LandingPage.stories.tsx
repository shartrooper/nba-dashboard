import { Landing } from '@/features/misc';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { Notifications } from '@/components/Notifications/Notifications';
import { useNotificationStore } from '@/store';
import { useEffect } from 'react';

export default {
  title: 'LandingPage',
  component: Landing,
};

export const LoginContainer = () => (
  <Landing>
    <LoginForm onSuccess={() => null} />
  </Landing>
);
export const RegistrationContainer = () => (
  <Landing>
    <RegisterForm onSuccess={() => null} />
  </Landing>
);
export const LandingWithNotifications = () => {
  const { addNotification } = useNotificationStore();

  useEffect(
    () =>
      addNotification({
        type: 'info',
        title: 'Hello Info',
        message: 'This is info notification',
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }),
    []
  );

  return (
    <>
      <Landing>
        <LoginForm onSuccess={() => null} />
        <Notifications />
      </Landing>
    </>
  );
};
