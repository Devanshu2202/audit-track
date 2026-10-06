import { useEffect, useState } from 'react'
import type { Claim } from '../types/claim'
import { getClaims } from '../services/claimService'
import StatusBadge from '../components/StatusBadge'

function Claims() {
    const [claims, setClaims] = useState<Claim[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getClaims()
            .then(setClaims)
            .catch(() => setError('Could not load claims. Is the API running?'))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p className="text-gray-500">Loading claims...</p>
    if (error) return <p className="text-red-600">{error}</p>

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Claims</h2>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">Claim No.</th>
                            <th className="px-4 py-3">Customer</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Error</th>
                            <th className="px-4 py-3">Audit Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {claims.map((claim) => (
                            <tr key={claim.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium">{claim.claimNumber}</td>
                                <td className="px-4 py-3">{claim.customerName}</td>
                                <td className="px-4 py-3">{claim.category}</td>
                                <td className="px-4 py-3">₹{claim.amount.toLocaleString('en-IN')}</td>
                                <td className="px-4 py-3"><StatusBadge status={claim.status} /></td>
                                <td className="px-4 py-3">{claim.errorFound ? claim.errorType : '-'}</td>
                                <td className="px-4 py-3">{claim.auditDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Claims