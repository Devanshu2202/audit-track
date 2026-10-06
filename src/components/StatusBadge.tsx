import type { ClaimStatus } from '../types/claim'

const styles: Record<ClaimStatus, string> = {
    Approved: 'bg-green-100 text-green-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    Rejected: 'bg-red-100 text-red-700',
    'Needs Review': 'bg-orange-100 text-orange-700',
}

function StatusBadge({ status }: { status: ClaimStatus }) {
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${styles[status]}`}>
            {status}
        </span>
    )
}

export default StatusBadge