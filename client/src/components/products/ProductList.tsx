import type { Product } from "@/types/productType";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

function ProductList({ products = [] }: ProductListProps) {
  return (
    <main className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          name={product.name}
          image={product.images[0].url}
          ratingCount={product.rating_count}
          price={product.price}
          id={product._id}
        />
      ))}
    </main>
  );
}

export default ProductList;
