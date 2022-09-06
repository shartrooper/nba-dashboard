import { Landing } from '@/features/misc';
import { ToLoginPage } from '../components/LoginLinkage';
import { RegisterForm } from '../components/RegisterForm';

export const Register = () => {
  return (
      <Landing>
        <RegisterForm onSuccess={() => null} />
        <ToLoginPage />
      </Landing>
  );
};