import axios from 'axios'
import type { Claim } from '../types/claim'

const api = axios.create({
    baseURL: 'http://localhost:3001',
})

export async function getClaims(): Promise<Claim[]> {
    const response = await api.get<Claim[]>('/claims')
    return response.data
}

export async function deleteClaim(id: string): Promise<void> {
    await api.delete(`/claims/${id}`)
}

export async function createClaim(claim: Omit<Claim, 'id'>): Promise<Claim> {
    const response = await api.post<Claim>('/claims', claim)
    return response.data
}