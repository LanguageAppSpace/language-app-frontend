import { PhrasePair } from "@/interface";
import { shuffleArray } from "@/Lessons/Quiz/quiz.utils";

export interface MatchingPairOption {
  pairId: number;
  text: string;
}

export interface MatchingPairsRound {
  leftOptions: MatchingPairOption[];
  rightOptions: MatchingPairOption[];
  originalPairs: PhrasePair[];
}

export const MATCHING_PAIRS_ROUND_SIZE = 5;

export const buildMatchingPairsRounds = (
  phrasePairs: PhrasePair[],
  roundSize = MATCHING_PAIRS_ROUND_SIZE
): MatchingPairsRound[] => {
  const rounds: MatchingPairsRound[] = [];

  for (let i = 0; i < phrasePairs.length; i += roundSize) {
    const roundPairs = phrasePairs.slice(i, i + roundSize);

    rounds.push({
      originalPairs: roundPairs,
      leftOptions: roundPairs.map((pair) => ({
        pairId: pair.id!,
        text: pair.phraseOne,
      })),
      rightOptions: shuffleArray(
        roundPairs.map((pair) => ({
          pairId: pair.id!,
          text: pair.phraseTwo,
        }))
      ),
    });
  }

  return rounds;
};
