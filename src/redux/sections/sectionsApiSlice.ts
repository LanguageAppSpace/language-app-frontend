import {
  NewSection,
  SectionResponse,
  UpdateSectionPayload,
  Section,
} from "@/interface";
import { apiSlice } from "@/redux/apiSlice";

export const sectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSections: builder.query<SectionResponse, void>({
      query: () => ({
        url: `flashcards/sections/`,
        method: "GET",
      }),
      providesTags: ["Sections"],
    }),
    createSection: builder.mutation<void, NewSection>({
      query: (data) => ({
        url: `flashcards/sections/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sections"],
    }),
    updateSection: builder.mutation<void, UpdateSectionPayload>({
      query: (data) => ({
        url: `flashcards/sections/${data.id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Sections", id },
        "Sections",
      ],
    }),
    deleteSection: builder.mutation<void, number>({
      query: (id) => ({
        url: `flashcards/sections/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sections"],
    }),
    getSectionById: builder.query<Section, number>({
      query: (id) => ({
        url: `flashcards/sections/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Sections", id }],
    }),
  }),
});

export const {
  useGetSectionsQuery,
  useCreateSectionMutation,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
  useGetSectionByIdQuery,
} = sectionApiSlice;
