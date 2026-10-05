import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
    return (
        <>
            <Navbar />
            <main className="p-6 max-w-6xl mx-auto">
                <Outlet />
            </main>
        </>
    )
}

export default Layout