import ProductStatusCard from "@/components/admin/ProductStatusCard";
import OrderTable from "@/components/products/OrderTable";
import ProductChart from "@/components/products/ProductChart ";
import RecentProduct from "@/components/products/RecentProduct";
import { useGetProductsWithFilterQuery } from "@/store/slices/api/productApi";
import type { Product } from "@/types/productType";

const Dashboard = () => {
  const { data: products = [], isLoading } = useGetProductsWithFilterQuery(
    {}
  ) as {
    data: Product[];
    isLoading: boolean;
  };

  const totalProductsLength = products.length;
  const featuredProductsLength = products.filter(
    (product) => product.is_feature
  ).length;
  const NewArrivalProductsLength = products.filter(
    (product) => product.is_new_arrival
  ).length;
  const instockProductsCount = products.reduce(
    (cv, pv) => cv + pv.instock_count,
    0
  );

  return (
    <section>
      <div className="grid gap-6 mb-8 grid-cols-2 md:grid-cols-4">
        <ProductStatusCard
          title="Total Products"
          value={totalProductsLength}
          isLoading={isLoading}
        />
        <ProductStatusCard
          title="Featured Products"
          value={featuredProductsLength}
          isLoading={isLoading}
        />
        <ProductStatusCard
          title="New Arrival Products"
          value={NewArrivalProductsLength}
          isLoading={isLoading}
        />
        <ProductStatusCard
          title="Total In Stock"
          value={instockProductsCount}
          isLoading={isLoading}
        />
      </div>
      <ProductChart data={products} />
      <div className="mt-8 flex flex-col md:flex-row gap-6">
        <RecentProduct data={products} />
        <OrderTable />
      </div>
    </section>
  );
};

export default Dashboard;
