import { Link } from "react-router";
import RatingConverter from "../../common/RatingConverter";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  ratingCount: number;
}

function ProductCard({
  id,
  name,
  price,
  image,
  ratingCount,
}: ProductCardProps) {
  return (
    <section>
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="w-full rounded-lg h-52 md:h-60 object-cover border-2 border-gray-300  hover:ring-1 hover:ring-gray-400 hover:border-gray-400 hover:scale-105 active:scale-95 duration-200"
        />
      </Link>
      <p className="font-medium my-2 line-clamp-1">{name}</p>
      <RatingConverter count={ratingCount} />
      <p className="text-xl font-bold">${price}</p>
    </section>
  );
}

export default ProductCard;
