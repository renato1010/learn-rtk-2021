import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const DOGS_API_KEY = import.meta.env.VITE_DOGS_API_KEY;

interface Breed {
  id: string;
  name: string;
  image: {
    url: string;
  };
}
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.thedogapi.com/v1",
    prepareHeaders: (headers) => {
      if (typeof DOGS_API_KEY === "string") {
        headers.set("x-api-key", DOGS_API_KEY);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchBreeds: builder.query<Breed[], number | void>({
      query: (limit = 10) => `/breeds?limit=${limit}`,
    }),
  }),
});

export const { useFetchBreedsQuery } = apiSlice;
