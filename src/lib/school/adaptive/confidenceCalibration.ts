export type CalibrationLevel = 'UNDERCONFIDENT' | 'CALIBRATED' | 'OVERCONFIDENT'
export interface ConfidenceProfile { level: CalibrationLevel; calibration: CalibrationLevel }
export async function getConfidenceProfile(..._args: unknown[]): Promise<ConfidenceProfile | null> { return null }
export function buildConfidenceCalibrationBlock(..._args: unknown[]): string { return '' }
export function detectLanguageConfidence(..._args: unknown[]): unknown { return null }
export function detectConfidenceCalibration(..._args: unknown[]): CalibrationLevel { return 'CALIBRATED' }
export type ConfidenceLevel = CalibrationLevel
