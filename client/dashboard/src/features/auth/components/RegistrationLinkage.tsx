import { Link } from 'react-router-dom';
import { LinkWrapper } from './LinkWrapper';

export const ToRegistrationPage = () => {
	return (
		<LinkWrapper>
			Do you want to signup?
			<Link to="../signup" className="ml-2 font-medium">
				Register
			</Link>
		</LinkWrapper>
	);
}