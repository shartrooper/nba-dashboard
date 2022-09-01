import { Link } from 'react-router-dom';

export const ToRegistrationPage = () => {
    return (<div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
            <Link to="../" className="font-medium text-blue-600 hover:text-blue-500">
                Login
            </Link>
        </div>
    </div>)
}