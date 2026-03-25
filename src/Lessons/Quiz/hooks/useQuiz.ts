import { useState } from "react";
import { Lesson } from "@/interface";
import { useEditPhrasePairMutation } from "@/redux/lessons/lessonsApiSlice";
import { buildQuizQuestions, QuizQuestion } from "@/Lessons/Quiz/quiz.utils";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice.ts";

const useQuiz = (lesson?: Lesson) => {
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState<QuizQuestion[]>([]);
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    buildQuizQuestions(lesson?.phrasePairs ?? [])
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [editPhrasePair] = useEditPhrasePairMutation();
  const dispatch = useDispatch();

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
      setWrongQuestions((prev) => [...prev, currentQuestion]);
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
          message: "Failed to save ",
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
    setWrongQuestions([]);
  };

  const restartWrongQuestions = () => {
    if (!wrongQuestions.length) return;

    const wrongPairs = wrongQuestions.map((q) => q.originalPair);

    setQuestions(buildQuizQuestions(wrongPairs));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setCorrectCount(0);
    setWrongCount(0);
    setWrongQuestions([]);
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
    restartWrongQuestions,
  };
};

export default useQuiz;
