export type Role = 'auditor' | 'admin'

export interface User {
    id: string
    name: string
    email: string
    role: Role
}