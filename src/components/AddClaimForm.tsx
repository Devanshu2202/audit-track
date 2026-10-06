import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { Claim, ClaimStatus } from '../types/claim'
import { useAuth } from '../hooks/useAuth'

interface Props {
    onAdd: (claim: Omit<Claim, 'id'>) => Promise<void>
}

const CATEGORIES = ['Health', 'Motor', 'Travel', 'Life']
const STATUSES: ClaimStatus[] = ['Pending', 'Approved', 'Rejected', 'Needs Review']

const emptyForm = {
    claimNumber: '',
    customerName: '',
    amount: '',
    category: 'Health',
    status: 'Pending' as ClaimStatus,
    errorFound: false,
    errorType: '',
}

function AddClaimForm({ onAdd }: Props) {
    const { user } = useAuth()
    const [form, setForm] = useState(emptyForm)
    const [submitting, setSubmitting] = useState(false)

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target
        const newValue =
            type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

        setForm({ ...form, [name]: newValue })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)

        await onAdd({
            claimNumber: form.claimNumber,
            customerName: form.customerName,
            amount: Number(form.amount),
            category: form.category,
            status: form.status,
            auditor: user?.name ?? 'Unknown',
            errorFound: form.errorFound,
            errorType: form.errorFound ? form.errorType : undefined,
            auditDate: new Date().toISOString().split('T')[0],
        })

        setForm(emptyForm)
        setSubmitting(false)
    }

    const inputClass = 'w-full border border-gray-300 rounded px-3 py-2'

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
            <input name="claimNumber" value={form.claimNumber} onChange={handleChange}
                placeholder="Claim number (CLM-1007)" required className={inputClass} />

            <input name="customerName" value={form.customerName} onChange={handleChange}
                placeholder="Customer name" required className={inputClass} />

            <input name="amount" type="number" min="1" value={form.amount} onChange={handleChange}
                placeholder="Amount" required className={inputClass} />

            <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            <label className="flex items-center gap-2">
                <input name="errorFound" type="checkbox" checked={form.errorFound} onChange={handleChange} />
                Error found
            </label>

            {form.errorFound && (
                <input name="errorType" value={form.errorType} onChange={handleChange}
                    placeholder="Error type (e.g. Amount mismatch)" required className={inputClass} />
            )}

            <button type="submit" disabled={submitting}
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
                {submitting ? 'Adding...' : 'Add Claim'}
            </button>
        </form>
    )
}

export default AddClaimForm