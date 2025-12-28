import { Link } from "react-router";

const ProductNotFound = () => {
  return (
    <div className="container flex flex-col items-center justify-center text-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-2">Product Not Found</h1>
      <p className="text-gray-500 mb-6">
        The product you are looking for doesn’t exist or was removed.
      </p>

      <Link
        to="/"
        className="px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:opacity-90 active:scale-95 duration-100"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ProductNotFound;
