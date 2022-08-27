import { Landing } from '@/features/misc'
import { LoginForm } from '@/features/auth/components/LoginForm'

export default {
    title: "LandingPage",
    component: Landing
}

export const Container = () => <Landing><LoginForm onSuccess={() => null} /></Landing>