import { useState } from "react";
import { Lesson } from "@/interface";
import { useEditPhrasePairMutation } from "@/redux/lessons/lessonsApiSlice";
import { buildQuizQuestions, QuizQuestion } from "@/Lessons/Quiz/quiz.utils";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice.ts";
import { useTranslation } from "react-i18next";

const useQuiz = (lesson?: Lesson) => {
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    buildQuizQuestions(lesson?.phrasePairs ?? [])
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [editPhrasePair] = useEditPhrasePairMutation();
  const dispatch = useDispatch();
  const { t } = useTranslation("flashcards");

  const quizQuestions = questions;
  const currentQuestion = quizQuestions[currentIndex] ?? null;
  const isFinished = currentIndex >= quizQuestions.length;
  const isAnswered = selectedAnswer !== null;

  const handleSelectAnswer = async (answer: string) => {
    if (!lesson || !currentQuestion || isAnswered) return;

    setSelectedAnswer(answer);

    const isAnswerCorrect = answer === currentQuestion.correctAnswer;

    if (isAnswerCorrect) {
      setCorrectCount((c) => c + 1);
    } else {
      setWrongCount((c) => c + 1);
    }

    const shouldUpdateProgress =
      currentQuestion.originalPair.isLearned !== isAnswerCorrect;

    if (!shouldUpdateProgress) return;

    try {
      await editPhrasePair({
        lessonId: lesson.id,
        pairId: currentQuestion.pairId,
        data: {
          ...currentQuestion.originalPair,
          isLearned: isAnswerCorrect,
        },
        sectionId: lesson.section,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update phrase pair", error);
      dispatch(
        showNotification({
          message: t("notifications.saveFailed"),
          severity: "error",
        })
      );
    }
  };

  const handleNextQuestion = () => {
    if (!isAnswered) return;

    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
  };

  const restartQuiz = () => {
    setQuestions(buildQuizQuestions(lesson?.phrasePairs ?? []));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setCorrectCount(0);
    setWrongCount(0);
  };

  return {
    quizQuestions,
    currentQuestion,
    currentIndex,
    selectedAnswer,
    isAnswered,
    isFinished,
    handleSelectAnswer,
    handleNextQuestion,
    correctCount,
    wrongCount,
    restartQuiz,
  };
};

export default useQuiz;
