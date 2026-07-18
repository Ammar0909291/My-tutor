export type RoadmapChapter = { id: string; title: string }
export interface RoadmapProgress { totalCount: number; completionPercent: number; subjectLabel: string }
export async function getSubjectRoadmap(..._args: unknown[]): Promise<RoadmapProgress | null> { return null }
export async function getOverallRoadmap(..._args: unknown[]): Promise<unknown> { return null }
export function roadmapProgressPhrase(..._args: unknown[]): string { return '' }
