import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""

    })

    console.log("formData", formData)



    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target

        setFormData({
            ...formData, [name]: value,
        })

    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    }
    return (
        <form onSubmit={handleSubmit}>
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
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="auditor@example.com"
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                    />

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-6"
                    />

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Log in
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Login