export const FOUNDERS_DEADLINE = new Date('2026-06-06T23:59:59-03:00')

export function isFoundersActive() {
    return FOUNDERS_DEADLINE - new Date() > 0
}
