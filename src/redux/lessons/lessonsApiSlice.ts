import { Lesson, NewLesson, PhrasePair, LessonResponse } from "@/interface";
import { apiSlice } from "@/redux/apiSlice";

export const lessonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewLesson: builder.mutation<void, NewLesson>({
      query: (data) => ({
        url: `flashcards/lessons/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Lessons", "Sections"],
    }),
    getLessonById: builder.query<Lesson, string>({
      query: (id) => ({
        url: `flashcards/lessons/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Lessons", id }],
    }),
    editLesson: builder.mutation<void, Lesson>({
      query: (data) => ({
        url: `flashcards/lessons/${data.id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Lessons", id },
        "Lessons",
        "Sections",
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
        { type: "Lessons", id: lessonId },
        "Lessons",
      ],
    }),
    getLessons: builder.query<LessonResponse, void>({
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
        { type: "Lessons", id: lessonId },
        "Lessons",
      ],
    }),
    resetLessonProgress: builder.mutation<void, string>({
      query: (id) => ({
        url: `flashcards/lessons/${id}/reset-progress/`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Lessons", id }],
    }),
    deleteLesson: builder.mutation<void, string>({
      query: (id) => ({
        url: `flashcards/lessons/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lessons", "Sections"],
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
  useResetLessonProgressMutation,
  useDeleteLessonMutation,
} = lessonApiSlice;
