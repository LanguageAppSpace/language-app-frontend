import { Lesson, NewLesson } from "@/interface";
import { apiSlice } from "@redux/apiSlice";

export const lessonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewLesson: builder.mutation<void, NewLesson>({
      query: (data) => ({
        url: `flashcards/lessons/`,
        method: "POST",
        body: data,
      }),
    }),
    getLessonById: builder.query<Lesson, string>({
      query: (id) => ({
        url: `flashcards/lessons/${id}/`,
        method: "GET",
      }),
    }),
    editLesson: builder.mutation<void, Lesson>({
      query: (data) => ({
        url: `flashcards/lessons/${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteFlashcard: builder.mutation<
      void,
      { lessonId: string; pairId: number }
    >({
      query: ({ lessonId, pairId }) => ({
        url: `flashcards/${lessonId}/pairs/${pairId}/delete/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateNewLessonMutation,
  useGetLessonByIdQuery,
  useEditLessonMutation,
  useDeleteFlashcardMutation,
} = lessonApiSlice;
