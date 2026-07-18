export interface StrategyEffectiveness { stalemate: boolean; staleMate: boolean; dominantStrategy: null }
export async function getStrategyEffectiveness(..._args: unknown[]): Promise<StrategyEffectiveness> {
  return { stalemate: false, staleMate: false, dominantStrategy: null }
}
