// import { useNavigate } from 'react-router-dom';
import { Landing } from '@/features/misc';
import { LoginForm } from '../components/LoginForm';
import { ToRegistrationPage } from '../components/RegistrationLinkage';

export const Login = () => {
  //const navigate = useNavigate();
  return (
      <Landing>
        <LoginForm onSuccess={() => null} />
        <ToRegistrationPage />
      </Landing>
  );
};
