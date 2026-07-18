export interface MockTestResult { score: number; passed: boolean }
export async function runMockTest(..._args: unknown[]): Promise<MockTestResult> { return { score: 0, passed: false } }
export async function generateMockTest(..._args: unknown[]): Promise<unknown> { return null }
export function buildMockTestInsightsBlock(..._args: unknown[]): string { return '' }
