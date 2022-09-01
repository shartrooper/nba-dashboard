import { Landing } from '@/features/misc';
import { RegisterForm } from '../components/RegisterForm';

export const Register = () => {
  //const navigate = useNavigate();
  return (
      <Landing>
        <RegisterForm onSuccess={() => null} />
      </Landing>
  );
};