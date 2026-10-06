import axios from 'axios'
import type { Claim } from '../types/claim'

const api = axios.create({
    baseURL: 'http://localhost:3001',
})

export async function getClaims(): Promise<Claim[]> {
    const response = await api.get<Claim[]>('/claims')
    return response.data
}