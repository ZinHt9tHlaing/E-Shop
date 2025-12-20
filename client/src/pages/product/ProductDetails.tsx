import RatingConverter from "@/common/RatingConverter";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const product = {
  id: 1,
  name: "Black T-Shirt",
  price: 200,
  category: "T-shirt",
  size: ["Small", "Medium", "Large"],
  colors: ["#F2440F", "#000000", "#f20fcc"],
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, vero aut similique fuga repellat ratione.",
  rating: 4,
  images: [
    {
      url: "https://iili.io/FCGxQTv.png",
    },
    {
      url: "https://cdn.shopify.com/s/files/1/0380/4705/6011/files/municipal-apparel_sport-utility-ss-t-shirt_black_MMTEE137_front.jpg",
    },
    {
      url: "https://www.monterrain.co.uk/images/products/medium/4105928_2.jpg",
    },
    {
      url: "https://www.mytheresa.com/media/1094/1238/100/3e/P00895460_d1.jpg",
    },
  ],
};

const ProductDetails = () => {
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [selectedSize, setSelectedSize] = useState<string>("Medium");

  useEffect(() => {
    if (product.images.length > 0) {
      setSelectedImage(product.images[0].url);
    }
  }, [product]);

  return (
    <section className="container grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <div className="grid grid-cols-4">
        <div className="col-span-1 flex flex-col gap-4">
          {product.images.map((img, index) => (
            <div
              key={index}
              className={`${
                selectedImage === img.url &&
                "border-2 border-gray-400 w-fit rounded-md"
              }`}
            >
              <img
                src={img.url}
                alt={img.url}
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
        <RatingConverter count={product.rating} />
        <p className="text-xl lg:text-3xl font-bold my-2">${product.price}</p>
        <p className="text-sm font-medium text-gray-400">
          {product.description}
        </p>

        <hr className="mt-4 text-gray-400" />

        {/* colors */}
        <h2 className="text-xl font-bold my-2">Colors</h2>
        <div className="flex items-center gap-2">
          {product.colors.map((color, index) => (
            <div
              key={index}
              className={`size-6 rounded-full cursor-pointer ${
                selectedColor === color && "border-2 border-gray-300 size-8"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>

        <hr className="mt-4 text-gray-400" />

        {/* sizes */}
        <h2 className="text-xl font-bold my-2">Sizes</h2>
        <div className="flex items-center gap-2">
          {product.size.map((size, i) => (
            <div
              className={`border border-gray-400 text-gray-400 px-4 py-2 rounded-full text-sm cursor-pointer ${
                selectedSize === size && "text-white bg-black border-black"
              }`}
              key={i}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </div>
          ))}
        </div>

        <hr className="mt-4 text-gray-300" />

        {/* add to cart */}
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="bg-black p-2 text-white rounded-md cursor-pointer active:scale-90 duration-200">
              <Minus className="size-4" />
            </button>
            <span className="font-medium">1</span>
            <button className="bg-black p-2 text-white rounded-md cursor-pointer active:scale-90 duration-200">
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
