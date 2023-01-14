import { Landing } from '@/features/misc';
import { LoginForm } from '../components/LoginForm';
import { ToRegistrationPage } from '../components/RegistrationLinkage';

export const Login = () => {
  return (
    <Landing>
      <LoginForm onSuccess={() => null} />
      <ToRegistrationPage />
    </Landing>
  );
};
