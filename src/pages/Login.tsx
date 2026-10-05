function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
                    AuditTrack
                </h1>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="auditor@example.com"
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-6"
                />

                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Log in
                </button>
            </div>
        </div>
    )
}

export default Login