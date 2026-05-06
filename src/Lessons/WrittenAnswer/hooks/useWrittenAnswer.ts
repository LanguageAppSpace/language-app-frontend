import { Lesson } from "@/interface";
import { useMemo, useState } from "react";

type PhrasePair = Lesson["phrasePairs"][number];

export interface WrittenAnswerResult {
  pair: PhrasePair;
  userAnswer: string;
  isCorrect: boolean;
}

const normalizeAnswer = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, " ");

const useWrittenAnswer = (lesson: Lesson) => {
  const initialPhrases = useMemo(
    () => lesson.phrasePairs,
    [lesson.phrasePairs]
  );

  const [phrasesToReview, setPhrasesToReview] =
    useState<PhrasePair[]>(initialPhrases);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [results, setResults] = useState<WrittenAnswerResult[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentPhrase = phrasesToReview[currentIndex];

  const correctCount = results.filter((result) => result.isCorrect).length;
  const wrongCount = results.filter((result) => !result.isCorrect).length;

  const failedResults = results.filter((result) => !result.isCorrect);

  const checkAnswer = () => {
    if (!currentPhrase || !userAnswer.trim()) return;

    const isCorrect =
      normalizeAnswer(userAnswer) === normalizeAnswer(currentPhrase.phraseTwo);

    setResults((prev) => [
      ...prev,
      {
        pair: currentPhrase,
        userAnswer,
        isCorrect,
      },
    ]);

    setIsAnswered(true);
  };

  const handleNext = () => {
    const isLastPhrase = currentIndex === phrasesToReview.length - 1;

    if (isLastPhrase) {
      setIsFinished(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setUserAnswer("");
    setIsAnswered(false);
  };

  const restartAll = () => {
    setPhrasesToReview(initialPhrases);
    setCurrentIndex(0);
    setUserAnswer("");
    setIsAnswered(false);
    setResults([]);
    setIsFinished(false);
  };

  const reviewFailedOnly = () => {
    const failedPhrases = failedResults.map((result) => result.pair);

    if (!failedPhrases.length) return;

    setPhrasesToReview(failedPhrases);
    setCurrentIndex(0);
    setUserAnswer("");
    setIsAnswered(false);
    setResults([]);
    setIsFinished(false);
  };

  return {
    phrasesToReview,
    currentPhrase,
    currentIndex,
    userAnswer,
    isAnswered,
    isFinished,
    correctCount,
    wrongCount,
    results,
    failedResults,
    setUserAnswer,
    checkAnswer,
    handleNext,
    restartAll,
    reviewFailedOnly,
  };
};

export default useWrittenAnswer;
