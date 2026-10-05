export type ClaimStatus = 'Pending' | 'Approved' | 'Rejected' | 'Needs Review';

export interface Claim {
    id: string;
    claimNumber: string;
    customerName: string;
    amount: number;
    category: string;
    status: ClaimStatus;
    auditor: string;
    errorFound: boolean;
    errorType?: string;
    auditDate: string;
}