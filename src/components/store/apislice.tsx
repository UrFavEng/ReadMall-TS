import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AddFavRES,
  AddReviewRES,
  AllCategoriesRes,
  CategoryByIdRES,
  DeleteFav,
  DeleteReviewRES,
  GetAllReviewRES,
  GetBookByIdRES,
  LoginReq,
  LoginRes,
  PublisherByIdResponse,
  RecentlyAndMostRes,
  ReviewREQ,
  SearchAuthorsRES,
  SearchBookRES,
  SignUpReq,
  SignUpRes,
  editProfileRES,
  getAllFavs,
  getAuthorByIdRES,
  getBookByCatRES,
  getmeRES,
} from "../../types/types.model";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://readmall.onrender.com/api/v1",
    prepareHeaders(headers) {
      localStorage.getItem("token") &&
        headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["dataUser", "dataReview", "fav", "crt"],
  endpoints: (builder) => ({
    getBooks: builder.query<RecentlyAndMostRes, { cat: string; page: number }>({
      query: ({ cat, page }) => `/books/${cat}?page=${page}`,
    }),
    getAllCats: builder.query<AllCategoriesRes, void>({
      query: () => `/categories/getAllCategories`,
    }),
    getBooksByCat: builder.query<
      getBookByCatRES,
      { id: undefined | string; pageCat: string | number }
    >({
      query: ({ id, pageCat }) =>
        `/books/getByCategoryId/${id}?page=${pageCat}`,
    }),
    signUp: builder.mutation<SignUpRes, SignUpReq>({
      query: (body) => ({
        url: "/users/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dataUser"],
    }),
    signin: builder.mutation<LoginRes, LoginReq>({
      query: (body) => ({ url: "/users/login", method: "POST", body }),
      invalidatesTags: ["dataUser"],
    }),
    getMe: builder.query<getmeRES, void>({
      query: () => `/users/me`,
      providesTags: ["dataUser"],
    }),
    editProfile: builder.mutation<editProfileRES, FormData>({
      query: (body) => ({
        url: "/users/editMyProfile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["dataUser"],
    }),
    getCatById: builder.query<CategoryByIdRES, string | undefined>({
      query: (id) => `/categories/getCategoryById/${id}`,
    }),
    SearchAuthor: builder.query<SearchAuthorsRES, string | undefined>({
      query: (name) => `/authors/getAuthorByName?name=${name}`,
    }),
    SearchBook: builder.query<SearchBookRES, string | undefined>({
      query: (name) => `/books/searchBooks?q=${name}`,
    }),
    bookById: builder.query<GetBookByIdRES, string | undefined>({
      query: (id) => `/books/getById/${id}`,
      providesTags: ["dataReview", "fav", "crt"],
    }),
    addReview: builder.mutation<AddReviewRES, ReviewREQ>({
      query: (body) => ({
        url: "/reviews/addReview",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dataReview"],
    }),
    addFav: builder.mutation<AddFavRES, { bookId: string | undefined }>({
      query: (body) => ({
        url: "/favorites/addFavorite",
        method: "POST",
        body,
      }),
      invalidatesTags: ["fav"],
    }),
    deleteFav: builder.mutation<DeleteFav, string | undefined>({
      query: (id) => ({
        url: `/favorites/deleteFavorite/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["fav"],
    }),
    addCart: builder.mutation<AddFavRES, { bookId: string | undefined }>({
      query: (body) => ({
        url: "/carts/addToCart",
        method: "POST",
        body,
      }),
      invalidatesTags: ["crt"],
    }),
    deleteCart: builder.mutation<DeleteFav, string | undefined>({
      query: (id) => ({
        url: `/carts/deleteFromCart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["crt"],
    }),
    getAllReviews: builder.query<
      GetAllReviewRES,
      { id: string | undefined; pageReview: number }
    >({
      query: ({ id, pageReview }) =>
        `/reviews/getBookReviews/${id}?limit=2&page=${pageReview}`,
      providesTags: ["dataReview"],
    }),
    deleteReview: builder.mutation<
      DeleteReviewRES,
      string | undefined | number
    >({
      query: (id) => ({
        url: `/reviews/deleteReview/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["dataReview"],
    }),
    getAuthorBuId: builder.query<getAuthorByIdRES, undefined | string>({
      query: (id) => `/authors/getAuthorById/${id}`,
    }),
    getPublisherById: builder.query<PublisherByIdResponse, string | undefined>({
      query: (id) => `/publishers/getPublisherById/${id}`,
    }),
    getAllFavs: builder.query<getAllFavs, void>({
      query: () => `/favorites/allFavorites`,
      providesTags: ["fav"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBooksQuery,
  useGetAllCatsQuery,
  useSignUpMutation,
  useGetMeQuery,
  useSigninMutation,
  useEditProfileMutation,
  useGetBooksByCatQuery,
  useGetCatByIdQuery,
  useSearchAuthorQuery,
  useSearchBookQuery,
  useBookByIdQuery,
  useAddReviewMutation,
  useAddFavMutation,
  useDeleteFavMutation,
  useAddCartMutation,
  useDeleteCartMutation,
  useGetAllReviewsQuery,
  useDeleteReviewMutation,
  useGetAuthorBuIdQuery,
  useGetPublisherByIdQuery,
  useGetAllFavsQuery,
} = apiSlice;
