import { Link } from 'react-router-dom';

export const ToLoginPage = () => {
    return (<div className="mt-4 text-center">
        <div className="text-sm tracking-wide">
            Already have an account?
            <Link to="../" className="ml-2 font-medium">
                Login
            </Link>
        </div>
    </div>)
}