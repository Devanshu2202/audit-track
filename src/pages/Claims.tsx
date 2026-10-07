import { useEffect, useState } from 'react'
import type { Claim, ClaimStatus } from '../types/claim'
import { CLAIM_STATUSES } from '../types/claim'
import { getClaims, deleteClaim, createClaim, updateClaim } from '../services/claimService'
import StatusBadge from '../components/StatusBadge'
import ClaimForm from '../components/ClaimForm'

function Claims() {
    const [claims, setClaims] = useState<Claim[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [editingClaim, setEditingClaim] = useState<Claim | null>(null)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState<'All' | ClaimStatus>('All')

    useEffect(() => {
        getClaims()
            .then(setClaims)
            .catch(() => setError('Could not load claims. Is the API running?'))
            .finally(() => setLoading(false))
    }, [])

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this claim?')) return

        try {
            await deleteClaim(id)
            setClaims(claims.filter((c) => c.id !== id))
            if (editingClaim?.id === id) setEditingClaim(null)
        } catch {
            setError('Could not delete the claim.')
        }
    }

    const handleSave = async (data: Omit<Claim, 'id'>) => {
        try {
            if (editingClaim) {
                const updated = await updateClaim({ ...data, id: editingClaim.id })
                setClaims(claims.map((c) => (c.id === updated.id ? updated : c)))
                setEditingClaim(null)
            } else {
                const saved = await createClaim(data)
                setClaims([...claims, saved])
            }
        } catch {
            setError('Could not save the claim.')
        }
    }

    if (loading) return <p className="text-gray-500">Loading claims...</p>
    if (error) return <p className="text-red-600">{error}</p>

    const searchText = search.toLowerCase()

    const visibleClaims = claims.filter((c) => {
        const matchesSearch =
            c.customerName.toLowerCase().includes(searchText) ||
            c.claimNumber.toLowerCase().includes(searchText)
        const matchesStatus = statusFilter === 'All' || c.status === statusFilter
        return matchesSearch && matchesStatus
    })

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Claims</h2>

            <ClaimForm
                key={editingClaim?.id ?? 'new'}
                claimToEdit={editingClaim}
                onSave={handleSave}
                onCancel={() => setEditingClaim(null)}
            />

            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by claim no. or customer"
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'All' | ClaimStatus)}
                    className="border border-gray-300 rounded px-3 py-2"
                >
                    <option value="All">All statuses</option>
                    {CLAIM_STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            <p className="text-sm text-gray-500 mb-2">
                Showing {visibleClaims.length} of {claims.length} claims
            </p>

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
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleClaims.map((claim) => (
                            <tr key={claim.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium whitespace-nowrap">{claim.claimNumber}</td>
                                <td className="px-4 py-3">{claim.customerName}</td>
                                <td className="px-4 py-3">{claim.category}</td>
                                <td className="px-4 py-3">₹{claim.amount.toLocaleString('en-IN')}</td>
                                <td className="px-4 py-3"><StatusBadge status={claim.status} /></td>
                                <td className="px-4 py-3">{claim.errorFound ? claim.errorType : '-'}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{claim.auditDate}</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <button
                                        onClick={() => {
                                            setEditingClaim(claim)
                                            window.scrollTo({ top: 0, behavior: 'smooth' })
                                        }}
                                        className="text-blue-600 hover:underline mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(claim.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {visibleClaims.length === 0 && (
                            <tr>
                                <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                                    No claims match your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Claims