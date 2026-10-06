import { useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import type { User } from '../types/user'

type MockUser = User & { password: string }

const MOCK_USERS: MockUser[] = [
    { id: '1', name: 'Asha Auditor', email: 'auditor@example.com', password: 'auditor123', role: 'auditor' },
    { id: '2', name: 'Adam Admin', email: 'admin@example.com', password: 'admin123', role: 'admin' },
]

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('auditUser')
        return saved ? JSON.parse(saved) : null
    })

    const login = (email: string, password: string) => {
        const found = MOCK_USERS.find(
            (u) => u.email === email && u.password === password
        )
        if (!found) return false

        const loggedInUser: User = {
            id: found.id,
            name: found.name,
            email: found.email,
            role: found.role,
        }
        setUser(loggedInUser)
        localStorage.setItem('auditUser', JSON.stringify(loggedInUser))
        return true
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('auditUser')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider