import ProductForm from "@/components/admin/ProductForm";
import type { ProductFormInputs } from "@/schema/productSchema";
import type { SubmitHandler } from "react-hook-form";

const ProductCreate = () => {
  const onSubmit: SubmitHandler<ProductFormInputs> = async (
    data: ProductFormInputs
  ) => {
    console.log("data", data);
  };

  const isLoading = false;

  return (
    <section>
      <h1 className="text-2xl font-bold mb-12">Create new product</h1>
      <ProductForm onSubmit={onSubmit} isLoading={isLoading} />
    </section>
  );
};

export default ProductCreate;
