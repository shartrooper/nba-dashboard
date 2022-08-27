// import { useNavigate } from 'react-router-dom';
import { ContentLayout } from '@/components/Layout';
import { Landing } from '@/features/misc';
import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  //const navigate = useNavigate();
  return (
    <ContentLayout>
      <Landing>
        <LoginForm onSuccess={() => null} />
      </Landing>
    </ContentLayout>
  );
};
