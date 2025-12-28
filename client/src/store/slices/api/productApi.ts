import type { Product, ProductMeta } from "@/types/productType";
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

        if (sizes && sizes.length) {
          sizes.forEach((size: string) => params.append("size", size));
        } // ?sizes=size

        if (colors && colors.length) {
          colors.forEach((color: string) => params.append("color", color));
        }

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

    getProductsMeta: builder.query<ProductMeta, string>({
      query: () => "/products/filters/meta",
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsWithFilterQuery,
  useGetNewArrivalsProductsQuery,
  useGetFeaturedProductsQuery,
  useGetProductByIdQuery,
  useGetProductsMetaQuery,
} = productApiSlice;
