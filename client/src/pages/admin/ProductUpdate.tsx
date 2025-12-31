import ProductForm from "@/components/admin/ProductForm";
import type { ProductFormInputs } from "@/schema/productSchema";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/store/slices/api/productApi";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const ProductUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const {
    data: initialData,
    isLoading,
    isError,
  } = useGetProductByIdQuery(id as string);

  useEffect(() => {
    if (isError || !id) navigate("/admin");
  }, [isError]);

  const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", String(data.price));
      formData.append("instock_count", String(data.instock_count));
      formData.append("category", data.category);
      formData.append("is_feature", String(data.is_feature));
      formData.append("is_new_arrival", String(data.is_new_arrival));
      formData.append("rating_count", String(data.rating_count));

      // arrays
      data.colors.forEach((color) => formData.append("colors[]", color));
      data.sizes.forEach((size) => formData.append("sizes[]", size));

      // separate existing images and new images
    const existingImages = data.images.filter(
        (img) => !img.file && img.url && img.public_alt
      );
      const newImages = data.images.filter((img) => img.file);

      // files
      formData.append("existingImages", JSON.stringify(existingImages));

      newImages.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file as File);
        }
      });

      const response = await updateProduct({
        id: id!,
        formData,
      }).unwrap();
      console.log("response", response);
      toast.success("Product updated successfully");
      navigate("/admin/manage-products");
    } catch (error) {
      toast.error("Failed to update product");
      console.error("Failed to update product", error);
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-bold mb-12">Edit product</h1>
      <ProductForm
        initialData={initialData}
        onSubmit={onSubmit}
        isLoading={isLoading}
        isUpdating={isUpdating}
      />
    </section>
  );
};

export default ProductUpdate;
