import { NavLink } from 'react-router-dom'

function Navbar() {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? 'text-white font-semibold border-b-2 border-white pb-1'
            : 'text-blue-100 hover:text-white'

    return (
        <nav className="bg-blue-600 px-6 py-4 flex items-center justify-between">
            <span className="text-white text-xl font-bold">AuditTrack</span>
            <div className="flex gap-6">
                <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
                <NavLink to="/claims" className={linkClass}>Claims</NavLink>
            </div>
        </nav>
    )
}

export default Navbar