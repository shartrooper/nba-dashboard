import { Link } from 'react-router-dom';

export const ToRegistrationPage = () => {
	return (<div className="mt-4 text-center">
		<div className="text-sm tracking-wide">
			Do you want to signup?
			<Link to="../signup" className="ml-2 font-medium">
				Register
			</Link>
		</div>
	</div>)
}