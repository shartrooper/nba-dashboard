import { Link } from 'react-router-dom';
import { LinkWrapper } from './LinkWrapper';

export const ToLoginPage = () => {
  return (
    <LinkWrapper>
      Already have an account?
      <Link to="../" className="ml-2 font-medium">
        Login
      </Link>
    </LinkWrapper>
  );
};
