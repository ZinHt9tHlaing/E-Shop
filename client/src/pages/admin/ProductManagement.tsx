import ProductStatusCard from "@/components/admin/ProductStatusCard";
import ProductTable from "@/components/products/ProductTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGetProductsWithFilterQuery } from "@/store/slices/api/productApi";
import type { Product } from "@/types/productType";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { PackagePlus } from "lucide-react";
import { Link } from "react-router";

const ProductManagement = () => {
  const {
    data: response,
    isLoading,
    error,
  } = useGetProductsWithFilterQuery({}) as {
    data: Product[];
    isLoading: boolean;
    error?: FetchBaseQueryError | SerializedError;
  };

  const products = response || [];

  if (error) {
    return (
      <div>
        <Card>
          <CardContent>
            <p className="text-destructive">
              Failed to load products. Please try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory and take actions
          </p>
        </div>
        <Button
          asChild
          className="active:ring-2 active:ring-gray-400 duration-150"
        >
          <div className="flex items-center gap-1">
            <PackagePlus className="w-8 h-8" />
            <Link to={"/admin/create-product"}>Add new product</Link>
          </div>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <ProductStatusCard
          title="Total Products"
          isLoading={isLoading}
          value={products.length}
        />
        <ProductStatusCard
          title="In Stock"
          isLoading={isLoading}
          iconColor="text-green-500"
          value={products.filter((p) => p.instock_count > 0).length}
        />
        <ProductStatusCard
          title="Out of Stock"
          isLoading={isLoading}
          iconColor="text-red-500"
          value={products.filter((p) => p.instock_count === 0).length}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>Manage and sort your products</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductTable data={products} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManagement;
