import { PhrasePair } from "@/interface";

export interface QuizQuestion {
  pairId: number;
  phraseOne: string;
  correctAnswer: string;
  options: string[];
  originalPair: PhrasePair;
}

const shuffleArray = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const buildOptionsForPair = (
  currentPair: PhrasePair,
  allPairs: PhrasePair[]
): string[] => {
  const wrongAnswers = shuffleArray(
    allPairs
      .filter((pair) => pair.id !== currentPair.id)
      .map((pair) => pair.phraseTwo)
  ).slice(0, 3);

  return shuffleArray([currentPair.phraseTwo, ...wrongAnswers]);
};

export const buildQuizQuestions = (
  phrasePairs: PhrasePair[]
): QuizQuestion[] => {
  return phrasePairs.map((pair) => ({
    pairId: pair.id!,
    phraseOne: pair.phraseOne,
    correctAnswer: pair.phraseTwo,
    options: buildOptionsForPair(pair, phrasePairs),
    originalPair: pair,
  }));
};
