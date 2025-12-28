import {
  useGetNewArrivalsProductsQuery,
  useGetFeaturedProductsQuery,
} from "@/store/slices/api/productApi";
import ProductList from "../../components/products/ProductList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

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
        <div className="flex justify-center mt-8">
          <Button
            asChild
            variant={"outline"}
            className="cursor-pointer active:ring-1 active:ring-black duration-150"
          >
            <Link to={"/products/filter"}>View All</Link>
          </Button>
        </div>
      </section>
      <section className="mt-16">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          FEATURED
        </h1>
        <ProductList products={featured?.data} />
        <div className="flex justify-center mt-8">
          <Button
            asChild
            variant={"outline"}
            className="cursor-pointer active:ring-1 active:ring-black duration-150"
          >
            <Link to={"/products/filter"}>View All</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Home;
