import type { Product } from "@/types/productType";

import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useDeleteProductMutation } from "@/store/slices/api/productApi";

const useProductColumns = (): ColumnDef<Product>[] => {
  const navigate = useNavigate();
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const productDeleteHandler = async (id: string, name: string) => {
    if (window.confirm("Are you sure want to delete " + name + "?")) {
      try {
        await deleteProduct(id).unwrap();
        toast.success(`${name} deleted successfully`);
      } catch (error) {
        console.log("Fail to delete product", error);
        toast.error("Fail to delete product");
      }
    }
  };

  return [
    // images
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => {
        const product = row.original;
        const images = product.images?.slice(0, 2);

        return (
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
            {images.map((img, index) => (
              <Avatar key={index}>
                <AvatarImage src={img.url} alt={product.name} />
                <AvatarFallback>
                  {product.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        );
      },
      enableSorting: false,
    },

    // name
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => {
        const product = row.original;
        return <div className="font-medium">{product.name}</div>;
      },
    },

    // category
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const product = row.original;
        return <div className="font-medium uppercase">{product.category}</div>;
      },
    },

    // price
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ getValue }) => {
        const price = getValue() as number;
        return <div className="font-medium">{price.toFixed(2)}</div>;
      },
    },

    // instock
    {
      accessorKey: "instock_count",
      header: "Instock",
      cell: ({ getValue }) => {
        const stock = getValue() as number;
        return (
          <Badge
            className="font-medium"
            variant={
              stock > 10 ? "default" : stock > 0 ? "secondary" : "destructive"
            }
          >
            {stock}
          </Badge>
        );
      },
    },

    // Created
    // product.createdAt.toISOString().split("T")[0]
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        return <div>{date.toISOString().split("T")[0]}</div>;
      },
      enableSorting: true,
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0 cursor-pointer">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigate(`/product/${product._id}`)}
                className="cursor-pointer"
              >
                <Eye className="mr-1 size-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                className="cursor-pointer"
              >
                <Edit className="mr-1 size-4" />
                Edit product
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => productDeleteHandler(product._id, product.name)}
                disabled={isLoading}
                className="cursor-pointer"
              >
                <Trash2
                  className={`mr-1 size-4 ${
                    isLoading ? "text-red-300" : "text-red-500"
                  }`}
                />
                {isLoading ? (
                  <span className="text-red-400 animate-pulse">
                    Deleting...
                  </span>
                ) : (
                  <span className="text-red-500">Delete Product</span>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};

export default useProductColumns;
