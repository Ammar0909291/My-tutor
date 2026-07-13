/**
 * LOW-4: pure decision for the duplicate-school-onboarding guard in
 * handleSchoolStudent (src/app/api/onboarding/route.ts) — given the
 * already-resolved Profile row (or null) and the User's onboardingCompleted
 * flag, decide whether to skip re-writing board/grade so a fully-completed
 * school onboarding isn't silently overwritten. Extracted so the decision
 * can be unit tested without a DB; the two lookups themselves
 * (tx.profile.findUnique, tx.user.findUnique) and the enclosing
 * transaction stay in the route, since those are DB/transaction concerns.
 */
export function shouldSkipSchoolOnboarding(
  existingProfile: { educationBoard: string | null } | null,
  onboardingCompleted: boolean | undefined,
): boolean {
  return !!(existingProfile && onboardingCompleted && existingProfile.educationBoard)
}
