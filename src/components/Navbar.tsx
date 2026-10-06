import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Navbar() {

    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? 'text-white font-semibold border-b-2 border-white pb-1'
            : 'text-blue-100 hover:text-white'


    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="bg-blue-600 px-6 py-4 flex items-center justify-between">
            <span className="text-white text-xl font-bold">AuditTrack</span>
            <div className="flex gap-6">
                <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
                <NavLink to="/claims" className={linkClass}>Claims</NavLink>
            </div>
            <div className="flex items-center gap-4 text-blue-100">
                <span>{user?.name} ({user?.role})</span>
                <button
                    onClick={handleLogout}
                    className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-50"
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar