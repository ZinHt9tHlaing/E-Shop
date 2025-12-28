import RatingConverter from "@/common/RatingConverter";
import ProductDetailsLoading from "@/components/products/ProductDetailsLoading";
import ProductNotFound from "@/components/products/ProductNotFound";
import { useGetProductByIdQuery } from "@/store/slices/api/productApi";
import type { ProductImage } from "@/types/productType";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [selectedSize, setSelectedSize] = useState<string>("Medium");
  const [quantity, setQuantity] = useState<number>(1);

  const { id } = useParams();

  const { data: product, isLoading } = useGetProductByIdQuery(id as string);

  useEffect(() => {
    if (product) {
      if (product.images.length > 0) setSelectedImage(product.images[0].url);
      if (product.colors.length > 0) setSelectedColor(product.colors[0]);
      if (product.sizes.length > 0) setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (isLoading) return <ProductDetailsLoading />;
  if (!product) return <ProductNotFound />;

  return (
    <section className="container grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <div className="grid grid-cols-4">
        <div className="col-span-1 flex flex-col gap-4">
          {product.images.map((img: ProductImage, index: number) => (
            <div
              key={index}
              className={`${
                selectedImage === img.url &&
                "border-2 border-gray-400 w-fit rounded-md"
              }`}
            >
              <img
                src={img.url}
                alt={img.public_alt}
                loading="lazy"
                decoding="async"
                onClick={() => setSelectedImage(img.url)}
                className="size-24 object-cover rounded-md cursor-pointer"
              />
            </div>
          ))}
        </div>
        <img
          src={selectedImage}
          loading="lazy"
          decoding="async"
          alt={product.name}
          className="col-span-3 h-full aspect-square rounded-md object-cover"
        />
      </div>

      <div className="flex flex-col justify-between">
        <h2 className="text-xl lg:text-3xl font-bold mb-4">{product.name}</h2>
        <RatingConverter count={product.rating_count} />
        <p className="text-xl lg:text-3xl font-bold my-2">${product.price}</p>
        <p className="text-sm font-medium text-gray-400">
          {product.description}
        </p>

        <hr className="mt-4 text-gray-400" />

        {/* colors */}
        <h2 className="text-xl font-bold my-2">Colors</h2>
        <div className="flex items-center gap-2">
          {product.colors.map((color: string, index: number) => (
            <div
              key={index}
              className={`size-6 rounded-full border border-gray-200 cursor-pointer ${
                selectedColor === color && "border-2 border-gray-300 size-8"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
              title={color}
            />
          ))}
        </div>

        <hr className="mt-4 text-gray-400" />

        {/* sizes */}
        <h2 className="text-xl font-bold my-2">Sizes</h2>
        <div className="flex items-center gap-2">
          {product.sizes.map((size: string, index: number) => (
            <div
              className={`border border-gray-400 text-gray-400 px-4 py-2 rounded-full text-sm cursor-pointer ${
                selectedSize === size && "text-white bg-black border-black"
              }`}
              key={index}
              onClick={() => setSelectedSize(size)}
              title={size}
            >
              {size}
            </div>
          ))}
        </div>

        <hr className="mt-4 text-gray-300" />

        {/* add to cart */}
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              className="bg-black p-2 text-white rounded-md cursor-pointer active:scale-90 duration-100"
              onClick={() =>
                setQuantity((prev) => (prev === 1 ? prev : prev - 1))
              }
            >
              <Minus className="size-4" />
            </button>
            <span className="font-medium">{quantity}</span>
            <button
              className="bg-black p-2 text-white rounded-md cursor-pointer active:scale-90 duration-100"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              <Plus className="size-4" />
            </button>
          </div>
          <button className="w-full text-center py-2 cursor-pointer bg-black text-sm font-medium text-white rounded-full active:scale-95 duration-200">
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
