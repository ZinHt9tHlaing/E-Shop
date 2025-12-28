import ProductCard from "@/components/products/ProductCard";
import ProductDetailsLoading from "@/components/products/ProductDetailsLoading";
import ProductNotFound from "@/components/products/ProductNotFound";
import { useGetProductsWithFilterQuery } from "@/store/slices/api/productApi";
import type { Product } from "@/types/productType";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const ProductFilter = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const initialKeyword = queryParams.get("keyword") || "";
  const initialCategory = queryParams.get("category") || "";

  // local state ( ui update / from url )
  const [filters, setFilters] = useState({
    keyword: initialKeyword,
    category: initialCategory,
  });

  // update local state ( when url change )
  useEffect(() => {
    setFilters({
      keyword: initialKeyword,
      category: initialCategory,
    });
  }, [location.search]);

  // sync url
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (filters.keyword) params.set("keyword", filters.keyword);
    if (filters.category) params.set("category", filters.category);

    navigate(
      { pathname: "/products/filter", search: params.toString() },
      { replace: true }
    );
  }, [filters, navigate]);

  const { data: product = [], isLoading } = useGetProductsWithFilterQuery(
    filters
  ) as {
    data: Product[];
    isLoading: boolean;
  };

  return (
    <div>
      {isLoading ? (
        <ProductDetailsLoading />
      ) : product.length === 0 ? (
        <ProductNotFound />
      ) : (
        <>
          <h1 className="text-xl text-center mt-4 mb-7">
            These are the Filtered Products
          </h1>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {product.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                image={product.images[0].url}
                price={product.price}
                ratingCount={product.rating_count}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductFilter;
