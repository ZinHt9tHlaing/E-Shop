import {
  useGetNewArrivalsProductsQuery,
  useGetFeaturedProductsQuery,
} from "@/store/slices/api/productApi";
import ProductList from "../../components/products/ProductList";

const Home = () => {
  const { data: newArrivals = [] } = useGetNewArrivalsProductsQuery(undefined);
  const { data: featured = [] } = useGetFeaturedProductsQuery(undefined);

  return (
    <main className="mt-16">
      <section>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          NEW ARRIVALS
        </h1>
        <ProductList products={newArrivals?.data} />
      </section>
      <section className="mt-16">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          FEATURED
        </h1>
        <ProductList products={featured?.data} />
      </section>
    </main>
  );
};

export default Home;
