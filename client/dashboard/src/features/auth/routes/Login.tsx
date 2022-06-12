// import { useNavigate } from 'react-router-dom';
import { ContentLayout } from '@/components/Layout';
import { Landing } from '@/features/misc';
import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  //const navigate = useNavigate();
  return (
    <Landing>
      <ContentLayout title="Log in to your account">
        <LoginForm onSuccess={() => null} />
      </ContentLayout>
    </Landing>
  );
};
