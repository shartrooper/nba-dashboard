import { Landing } from '@/features/misc'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { RegisterForm } from '@/features/auth/components/RegisterForm'

export default {
    title: "LandingPage",
    component: Landing
}

export const LoginContainer = () => <Landing><LoginForm onSuccess={() => null} /></Landing>
export const RegistrationContainer = () => <Landing><RegisterForm onSuccess={() => null} /></Landing> 