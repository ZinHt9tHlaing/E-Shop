import { products } from "../../data";
import ProductCard from "./ProductCard";

// interface ProductListProps {
//   products: Product[];
// }

function ProductList() {
  return (
    <main className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard
          name={product.name}
          image={product.images[0].url}
          ratingCount={product.rating}
          price={product.price}
          key={product.id}
          id={Number(product.id).toString()}
        />
      ))}
    </main>
  );
}

export default ProductList;
