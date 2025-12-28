import ProductCard from "@/components/products/ProductCard";
import ProductDetailsLoading from "@/components/products/ProductDetailsLoading";
import ProductNotFound from "@/components/products/ProductNotFound";
import { Button } from "@/components/ui/button";
import {
  useGetProductsMetaQuery,
  useGetProductsWithFilterQuery,
} from "@/store/slices/api/productApi";
import type { Product, ProductFilters } from "@/types/productType";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const ProductFilter = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialFilters = (): ProductFilters => {
    const queryParams = new URLSearchParams(location.search);
    return {
      keyword: queryParams.get("keyword") || "",
      category: queryParams.get("category") || "",
      minPrice: queryParams.get("minPrice") || "",
      maxPrice: queryParams.get("maxPrice") || "",
      colors: queryParams.getAll("colors"),
      sizes: queryParams.getAll("sizes"),
    };
  };

  // local state ( ui update / from url)
  const [filters, setFilters] = useState(initialFilters);

  // update local state ( when url change )
  useEffect(() => {
    setFilters(initialFilters());
  }, [location.search]);

  // sync url
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.keyword) params.set("keyword", filters.keyword);
    if (filters.category) params.set("category", filters.category);

    filters.colors.forEach((color) => params.append("colors", color));
    filters.sizes.forEach((size) => params.append("sizes", size));

    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);

    const newSearchQuery = params.toString();
    const currentSearchQuery = location.search.slice(1);

    if (newSearchQuery !== currentSearchQuery) {
      // Debounce
      const timeoutId = setTimeout(() => {
        navigate(
          { pathname: "/products/filter", search: newSearchQuery },
          { replace: true }
        );
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [filters, navigate, location.search]);

  const { data: product = [], isLoading } = useGetProductsWithFilterQuery(
    filters
  ) as {
    data: Product[];
    isLoading: boolean;
  };

  const { data: productsMeta } = useGetProductsMetaQuery("");

  const toggleValue = (key: "colors" | "sizes", value: string) => {
    setFilters((prev) => {
      const currentValues = prev[key]; // ["Red","Blue"]
      const newValues = currentValues.includes(value)
        ? currentValues.filter((x) => x !== value)
        : [...currentValues, value];
      return { ...prev, [key]: newValues };
    });
  };

  const handlePriceChange = (type: "minPrice" | "maxPrice", value: string) => {
    setFilters((prev) => {
      return {
        ...prev,
        [type]: value, // dynamic key
      };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      keyword: "",
      category: "",
      colors: [],
      sizes: [],
      minPrice: "",
      maxPrice: "",
    });
    navigate("/products/filter", { replace: true });
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.keyword ||
      filters.category ||
      filters.colors.length > 0 ||
      filters.sizes.length > 0 ||
      filters.minPrice ||
      filters.maxPrice
    );
  }, [filters]);

  return (
    <div className="grid grid-cols-12">
      {/* Product Filters */}
      <div className="col-span-3">
        <h2 className="text-xl font-bold mb-2">Product Filters</h2>
        {/* Colors */}
        <h3 className="text-lg font-semibold mb-2">Colors</h3>
        <div className="flex flex-col gap-1">
          {productsMeta?.colors.map((color, index) => (
            <label key={index}>
              <input
                type="checkbox"
                className="mr-1"
                onChange={() => toggleValue("colors", color)}
                checked={filters.colors.includes(color)}
              />
              <span>{color}</span>
            </label>
          ))}
        </div>

        {/* Sizes */}
        <h3 className="text-lg font-semibold mb-2 mt-4">Sizes</h3>
        <div className="flex flex-col gap-1">
          {productsMeta?.sizes.map((size, index) => (
            <label key={index}>
              <input
                type="checkbox"
                className="mr-1"
                onChange={() => toggleValue("sizes", size)}
                checked={filters.sizes.includes(size)}
              />
              <span>{size}</span>
            </label>
          ))}
        </div>

        {/* Price */}
        <h3 className="text-lg font-semibold mb-2 mt-4">Price</h3>
        <div className="flex flex-col gap-1">
          <input
            type="number"
            min={0}
            value={filters.minPrice!}
            onChange={(e) => handlePriceChange("minPrice", e.target.value)}
            placeholder={`Min (${productsMeta?.minPrice})`}
            className="border p-1"
          />
          <input
            type="number"
            min={productsMeta?.maxPrice}
            value={filters.maxPrice!}
            onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
            placeholder={`Max (${productsMeta?.maxPrice})`}
            className="border p-1"
          />
        </div>

        {hasActiveFilters && (
          <div className=" pr-4">
            <Button
              variant={"destructive"}
              onClick={clearAllFilters}
              className="w-full mt-2 cursor-pointer active:ring-1 active:ring-offset-2 active:ring-offset-zinc-900"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Products */}
      <div className="col-span-9 ms-10 lg:ms-0">
        {isLoading ? (
          <ProductDetailsLoading />
        ) : product.length === 0 ? (
          <ProductNotFound />
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center lg:text-start">
              Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
    </div>
  );
};

export default ProductFilter;
