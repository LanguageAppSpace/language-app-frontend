import { useEffect, useState } from "react";
import { useGetLessonByIdQuery } from "@/redux/lessons/lessonsApiSlice";

const useFlashcards = (lessonId: string) => {
  const { data: lesson, isLoading } = useGetLessonByIdQuery(lessonId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [currentIndex]);

  const handleFlip = () => setFlipped((fliped) => !fliped);

  return {
    lesson,
    isLoading,
    phrases: lesson?.phrasePairs ?? [],
    currentIndex,
    setCurrentIndex,
    flipped,
    setFlipped,
    handleFlip,
  };
};

export default useFlashcards;
