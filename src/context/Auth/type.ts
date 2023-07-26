import { User } from 'firebase/auth'
import { AuthStatus } from '.'

export type AuthContextType = {
    user: (User & { fullName?: string }) | null
    status: AuthStatus
    isLoggedIn: boolean
    setStatus: (value: React.SetStateAction<AuthStatus>) => void
}
