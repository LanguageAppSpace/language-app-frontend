import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Lesson, PhrasePair } from "@/interface";
import {
  buildMatchingPairsRounds,
  MatchingPairOption,
  MatchingPairsRound,
} from "@/Lessons/MatchingPairs/matchingPairs.utils";
import { useEditPhrasePairMutation } from "@/redux/lessons/lessonsApiSlice";
import { showNotification } from "@/redux/notification/notificationSlice";
import { useTranslation } from "react-i18next";

const useMatchingPairs = (lesson?: Lesson) => {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [selectedLeft, setSelectedLeft] = useState<MatchingPairOption | null>(
    null
  );
  const [selectedRight, setSelectedRight] = useState<MatchingPairOption | null>(
    null
  );
  const [matchedPairIds, setMatchedPairIds] = useState<number[]>([]);
  const [wrongPairId, setWrongPairId] = useState<number | null>(null);
  const roundsLessonIdRef = useRef<Lesson["id"] | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const roundsRef = useRef<MatchingPairsRound[]>([]);

  const { t } = useTranslation("flashcards");

  const [editPhrasePair] = useEditPhrasePairMutation();
  const dispatch = useDispatch();

  if (lesson && roundsLessonIdRef.current !== lesson.id) {
    roundsRef.current = buildMatchingPairsRounds(lesson.phrasePairs);
    roundsLessonIdRef.current = lesson.id;
  }

  const rounds = roundsRef.current;

  const currentRound = rounds[currentRoundIndex];
  const isFinished = currentRoundIndex >= rounds.length;

  const currentRoundMatchedPairIds =
    currentRound?.originalPairs
      .map((pair) => pair.id!)
      .filter((pairId) => matchedPairIds.includes(pairId)) ?? [];

  const isCurrentRoundCompleted =
    !!currentRound &&
    currentRoundMatchedPairIds.length === currentRound.originalPairs.length;

  const resetSelection = () => {
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const updatePairProgress = async (pair: PhrasePair) => {
    if (!lesson || pair.isLearned) return;

    try {
      await editPhrasePair({
        lessonId: lesson.id,
        pairId: pair.id!,
        data: {
          ...pair,
          isLearned: true,
        },
        sectionId: lesson.section,
      }).unwrap();
    } catch (error) {
      dispatch(
        showNotification({
          message: t("notifications.saveFailed"),
          severity: "error",
        })
      );
    }
  };

  const checkSelectedPair = async (
    leftOption: MatchingPairOption,
    rightOption: MatchingPairOption
  ) => {
    const isCorrect = leftOption.pairId === rightOption.pairId;

    if (!isCorrect) {
      setWrongAnswers((prev) => prev + 1);
      setWrongPairId(rightOption.pairId);

      globalThis.setTimeout(() => {
        setWrongPairId(null);
        resetSelection();
      }, 700);

      return;
    }
    setCorrectAnswers((prev) => prev + 1);

    const originalPair = currentRound?.originalPairs.find(
      (pair) => pair.id === leftOption.pairId
    );

    setMatchedPairIds((prevMatchedPairIds) => [
      ...new Set([...prevMatchedPairIds, leftOption.pairId]),
    ]);
    resetSelection();

    if (originalPair) {
      await updatePairProgress(originalPair);
    }
  };

  const handleSelectLeft = async (option: MatchingPairOption) => {
    if (matchedPairIds.includes(option.pairId)) return;

    setSelectedLeft(option);
    setWrongPairId(null);

    if (selectedRight) {
      await checkSelectedPair(option, selectedRight);
    }
  };

  const handleSelectRight = async (option: MatchingPairOption) => {
    if (matchedPairIds.includes(option.pairId)) return;

    setSelectedRight(option);
    setWrongPairId(null);

    if (selectedLeft) {
      await checkSelectedPair(selectedLeft, option);
    }
  };

  const handleNextRound = () => {
    if (!isCurrentRoundCompleted) return;

    setCurrentRoundIndex((prev) => prev + 1);
    resetSelection();
    setWrongPairId(null);
  };

  const handleRestart = () => {
    setCurrentRoundIndex(0);
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedPairIds([]);
    setWrongPairId(null);
    setCorrectAnswers(0);
    setWrongAnswers(0);

    if (lesson) {
      roundsRef.current = buildMatchingPairsRounds(lesson.phrasePairs);
    }
  };

  return {
    rounds,
    currentRound,
    currentRoundIndex,
    selectedLeft,
    selectedRight,
    matchedPairIds,
    wrongPairId,
    isCurrentRoundCompleted,
    isFinished,
    handleSelectLeft,
    handleSelectRight,
    handleNextRound,
    handleRestart,
    correctAnswers,
    wrongAnswers,
  };
};

export default useMatchingPairs;
