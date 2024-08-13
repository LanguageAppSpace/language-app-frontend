import { Lesson } from "@/interface";
import { apiSlice } from "@redux/apiSlice";

export const lessonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewLesson: builder.mutation<void, Lesson>({
      query: (data) => {
        const { phrasePairs, title, description } = data;
        return {
          url: `flashcards/lessons/`,
          method: "POST",
          body: {
            phrase_pairs: phrasePairs.map((pair) => ({
              phrase_one: pair.phraseOne,
              phrase_two: pair.phraseTwo,
            })),
            title,
            description,
          },
        };
      },
    }),
  }),
});

export const { useCreateNewLessonMutation } = lessonApiSlice;
