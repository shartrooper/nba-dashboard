// import { useNavigate } from 'react-router-dom';
import { ContentLayout } from '@/components/Layout';
import { Landing } from '@/features/misc';

export const Login = () => {
  // const navigate = useNavigate();
  return (
    <Landing>
      <ContentLayout title="Log in to your account">
        LOG IN COMPONENT
        {/*<LoginForm onSuccess={() => navigate('/app')} />*/}
      </ContentLayout>
    </Landing>
  );
};
