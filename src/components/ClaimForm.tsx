import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { Claim, ClaimStatus } from '../types/claim'
import { CLAIM_STATUSES } from '../types/claim'
import { useAuth } from '../hooks/useAuth'

interface Props {
    claimToEdit: Claim | null
    onSave: (claim: Omit<Claim, 'id'>) => Promise<void>
    onCancel: () => void
}

type FormState = {
    claimNumber: string
    customerName: string
    amount: string
    category: string
    status: ClaimStatus
    errorFound: boolean
    errorType: string
}

const CATEGORIES = ['Health', 'Motor', 'Travel', 'Life']

const emptyForm: FormState = {
    claimNumber: '',
    customerName: '',
    amount: '',
    category: 'Health',
    status: 'Pending',
    errorFound: false,
    errorType: '',
}

function toFormState(claim: Claim | null): FormState {
    if (!claim) return emptyForm
    return {
        claimNumber: claim.claimNumber,
        customerName: claim.customerName,
        amount: String(claim.amount),
        category: claim.category,
        status: claim.status,
        errorFound: claim.errorFound,
        errorType: claim.errorType ?? '',
    }
}

function ClaimForm({ claimToEdit, onSave, onCancel }: Props) {
    const { user } = useAuth()
    const [form, setForm] = useState<FormState>(toFormState(claimToEdit))
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

        await onSave({
            claimNumber: form.claimNumber,
            customerName: form.customerName,
            amount: Number(form.amount),
            category: form.category,
            status: form.status,
            auditor: claimToEdit?.auditor ?? user?.name ?? 'Unknown',
            errorFound: form.errorFound,
            errorType: form.errorFound ? form.errorType : undefined,
            auditDate: claimToEdit?.auditDate ?? new Date().toISOString().split('T')[0],
        })

        if (!claimToEdit) setForm(emptyForm)
        setSubmitting(false)
    }

    const inputClass = 'w-full border border-gray-300 rounded px-3 py-2'

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
            <h3 className="md:col-span-3 font-semibold text-gray-700">
                {claimToEdit ? `Editing ${claimToEdit.claimNumber}` : 'Add a new claim'}
            </h3>

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
                {CLAIM_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            <label className="flex items-center gap-2">
                <input name="errorFound" type="checkbox" checked={form.errorFound} onChange={handleChange} />
                Error found
            </label>

            {form.errorFound && (
                <input name="errorType" value={form.errorType} onChange={handleChange}
                    placeholder="Error type (e.g. Amount mismatch)" required className={inputClass} />
            )}

            <div className="flex gap-2">
                <button type="submit" disabled={submitting}
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
                    {submitting ? 'Saving...' : claimToEdit ? 'Save Changes' : 'Add Claim'}
                </button>

                {claimToEdit && (
                    <button type="button" onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    )
}

export default ClaimForm