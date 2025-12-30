import { productSchema, type ProductFormInputs } from "@/schema/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import ImageUpload from "./ImageUpload";
import CategorySelect from "./CategorySelect";
import ColorPicker from "./ColorPicker";
import SizeSelector from "./SizeSelector";
import { Switch } from "../ui/switch";
import Tiptap from "../editor/TipTap";

interface ProductFormProps {
  initialData?: ProductFormInputs; // for Edit Form
  onSubmit: (data: ProductFormInputs) => void; // for create and edit
  isLoading: boolean; // disable button
}

interface Img {
  url: string;
  public_alt: string;
}

const ProductForm = ({
  initialData,
  onSubmit,
  isLoading,
}: ProductFormProps) => {
  const form = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          price: initialData.price,
          instock_count: initialData.instock_count,
          category: initialData.category,
          sizes: initialData.sizes,
          colors: initialData.colors,
          is_feature: initialData.is_feature,
          is_new_arrival: initialData.is_new_arrival,
          rating_count: initialData.rating_count,
          images: initialData?.images.map(
            (img): Img => ({
              url: img.url,
              public_alt: img.public_alt!,
            })
          ),
        }
      : {
          name: "",
          description: "",
          price: 0,
          instock_count: 0,
          category: "",
          sizes: [],
          colors: [],
          is_feature: false,
          is_new_arrival: false,
          rating_count: 0,
          images: [],
        },
  });

  // console.log("errors", form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
        {/* Product Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Tiptap value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Instock Count */}
          <FormField
            control={form.control}
            name="instock_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instock Count</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Images */}
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <ImageUpload images={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <CategorySelect
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Sizes */}
          <FormField
            control={form.control}
            name="sizes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sizes</FormLabel>
                <FormControl>
                  <SizeSelector sizes={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Colors */}
        <FormField
          control={form.control}
          name="colors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colors</FormLabel>
              <FormControl>
                <ColorPicker colors={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* New Arrival */}
          <FormField
            control={form.control}
            name="is_new_arrival"
            render={({ field }) => (
              <FormItem className="flex items-center rounded-lg border p-4">
                <FormLabel>New Arrival</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Featured */}
          <FormField
            control={form.control}
            name="is_feature"
            render={({ field }) => (
              <FormItem className="flex items-center rounded-lg border p-4">
                <FormLabel>Featured Product</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer active:ring-2 active:ring-gray-400 duration-150"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin text-white size-5" />
              <span className="animate-pulse">
                {initialData ? "Updating..." : "Creating..."}
              </span>
            </>
          ) : (
            <>{initialData ? "Update Product" : "Create Product"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
