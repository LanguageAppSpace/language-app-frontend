import { Lesson, NewLesson, PhrasePair, PaginatedResponse } from "@/interface";
import { apiSlice } from "@/redux/apiSlice";

export const lessonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewLesson: builder.mutation<void, NewLesson>({
      query: (data) => ({
        url: `flashcards/lessons/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Lessons"],
    }),
    getLessonById: builder.query<Lesson, string>({
      query: (id) => ({
        url: `flashcards/lessons/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Lesson", id }],
    }),
    editLesson: builder.mutation<void, Lesson>({
      query: (data) => ({
        url: `flashcards/lessons/${data.id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Lesson", id },
        { type: "Lessons" },
      ],
    }),
    deleteFlashcard: builder.mutation<
      void,
      { lessonId: string; pairId: number }
    >({
      query: ({ lessonId, pairId }) => ({
        url: `flashcards/${lessonId}/pairs/${pairId}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { lessonId }) => [
        { type: "Lesson", id: lessonId },
        { type: "Lessons" },
      ],
    }),
    getLessons: builder.query<PaginatedResponse<Lesson>, void>({
      query: () => ({
        url: `flashcards/lessons/`,
        method: "GET",
      }),
      providesTags: ["Lessons"],
    }),
    editPhrasePair: builder.mutation<
      void,
      { lessonId: string; pairId: number; data: PhrasePair }
    >({
      query: ({ lessonId, pairId, data }) => ({
        url: `flashcards/${lessonId}/pairs/${pairId}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { lessonId }) => [
        { type: "Lesson", id: lessonId },
        { type: "Lessons" },
      ],
    }),
  }),
});

export const {
  useCreateNewLessonMutation,
  useGetLessonByIdQuery,
  useEditLessonMutation,
  useDeleteFlashcardMutation,
  useEditPhrasePairMutation,
  useGetLessonsQuery,
} = lessonApiSlice;
