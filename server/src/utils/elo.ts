import VoteOutcome from '../types/VoteOutcome';

/**
 *
 * @param Ra Rating of A
 * @param Rb Rating of B
 * @returns Expectation of winning for each
 */
function expectation(Ra: number, Rb: number) {
  const Ea = 1 / (1 + 10 ** ((Rb - Ra) / 400));
  const Eb = 1 - Ea;
  return { Ea, Eb };
}
/**
 *
 * @param R Rating of item
 * @param K Max amount of points a player can win or lose (K constant)
 * @param S Outcome of the match relative to current item
 * @param E Expectation of item to win
 * @returns New rating of item
 */
function rating(R: number, K: number, S: VoteOutcome, E: number) {
  const rating = R + K * (S - E);
  return rating;
}
/**
 *
 * @param Ra Rating of A
 * @param Rb Rating of B
 * @param outcome Outcome relative to A
 * @param K Max amount of points a player can win or lose (K constant)
 * @returns New ratings of the two items
 */
function score(Ra: number, Rb: number, S: VoteOutcome, K: number) {
  const { Ea, Eb } = expectation(Ra, Rb);
  const Ra1 = Math.round(rating(Ra, K, S, Ea));
  const Rb1 = Math.round(rating(Rb, K, (1 - S) as VoteOutcome, Eb)); // 1-S because S is relative to A
  return { ratingA: Ra1, ratingB: Rb1 };
}
export default { score, rating, expectation };
