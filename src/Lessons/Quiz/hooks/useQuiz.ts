import { useState } from "react";
import { Lesson } from "@/interface";
import { useEditPhrasePairMutation } from "@/redux/lessons/lessonsApiSlice";
import { buildQuizQuestions, QuizQuestion } from "@/Lessons/Quiz/quiz.utils";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice.ts";

const useQuiz = (lesson?: Lesson) => {
  const [quizQuestions] = useState<QuizQuestion[]>(() =>
    buildQuizQuestions(lesson?.phrasePairs ?? [])
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [editPhrasePair] = useEditPhrasePairMutation();
  const dispatch = useDispatch();

  const currentQuestion = quizQuestions[currentIndex];
  const isFinished = currentIndex >= quizQuestions.length;
  const isAnswered = selectedAnswer !== null;

  const handleSelectAnswer = async (answer: string) => {
    if (!lesson || !currentQuestion || isAnswered) return;

    setSelectedAnswer(answer);

    const isAnswerCorrect = answer === currentQuestion.correctAnswer;
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

  return {
    quizQuestions,
    currentQuestion,
    currentIndex,
    selectedAnswer,
    isAnswered,
    isFinished,
    handleSelectAnswer,
    handleNextQuestion,
  };
};

export default useQuiz;
