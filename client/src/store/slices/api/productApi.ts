import type { Product } from "@/types/productType";
import { apiSlice } from "../apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsWithFilter: builder.query({
      query: ({
        sizes,
        colors,
        minPrice,
        maxPrice,
        sortBy,
        keyword,
        category,
      }) => {
        const params = new URLSearchParams();

        if (sizes) params.append("sizes", sizes); // ?sizes=size
        if (colors) params.append("colors", colors);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (sortBy) params.append("sortBy", sortBy);
        if (keyword) params.append("keyword", keyword);
        if (category) params.append("category", category);

        return `/products/get-filter-products?${params.toString()}`;
      },
      providesTags: ["Product"],
    }),

    getNewArrivalsProducts: builder.query({
      query: () => "/products/get-new-arrival-products",
      providesTags: ["Product"],
    }),

    getFeaturedProducts: builder.query({
      query: () => "/products/get-featured-products",
      providesTags: ["Product"],
    }),

    getProductById: builder.query<Product, string>({
      query: (id: string) => `/products/${id}`,
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsWithFilterQuery,
  useGetNewArrivalsProductsQuery,
  useGetFeaturedProductsQuery,
  useGetProductByIdQuery,
} = productApiSlice;
