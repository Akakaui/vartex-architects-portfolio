import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'missing'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-05-01', // Updated for latest features
    useCdn: false,
})

// Client with Write permissions (for logging leads)
export const writeClient = createClient({
    projectId,
    dataset,
    apiVersion: '2024-05-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
})
