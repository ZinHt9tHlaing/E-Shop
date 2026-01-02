import ProductForm from "@/components/admin/ProductForm";
import type { ProductFormInputs } from "@/schema/productSchema";
import { useCreateProductMutation } from "@/store/slices/api/productApi";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const ProductCreate = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const navigate = useNavigate();

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

      // files
      data.images.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file as File);
        }
      });

      const response = await createProduct(formData).unwrap();
      console.log("response", response);
      toast.success("Product created successfully");
      navigate("/admin/manage-products");
    } catch (error) {
      toast.error("Failed to create product");
      console.error("Failed to create product", error);
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-bold mb-12">Create new product</h1>
      <ProductForm onSubmit={onSubmit} isLoading={isLoading} />
    </section>
  );
};

export default ProductCreate;
