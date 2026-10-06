import { createContext } from 'react'
import type { User } from '../types/user'

export interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => boolean
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)