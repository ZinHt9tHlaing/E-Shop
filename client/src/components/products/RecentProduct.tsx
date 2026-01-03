import type { Product } from "@/types/productType";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

interface ProductChartProps {
  data: Product[];
}

const RecentProduct = ({ data }: ProductChartProps) => {
  const recentProducts = [...data]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4); // Get the 4 most recent products as descending

  return (
    <div className="md:flex-1">
      <Card>
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
          <CardDescription>
            showing {recentProducts.length} of recent products
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentProducts.map((product) => (
            <div key={product._id} className="py-2 border-b border-b-gray-300">
              <h2 className="text-sm font-medium mb-0.5">{product.name}</h2>
              <Badge>{product.category}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentProduct;
