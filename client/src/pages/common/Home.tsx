import ProductList from "../../components/products/ProductList";

const Home = () => {
  return (
    <main className="mt-16">
      <section>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          NEW ARRIVALS
        </h1>
        <ProductList />
      </section>
      <section className="mt-16">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          FEATURED
        </h1>
        <ProductList />
      </section>
    </main>
  );
};

export default Home;
