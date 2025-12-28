import { Menu } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";

const categories = ["T-shirt", "Hoodie", "Shorts", "Jeans"];

const SecondaryBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentCategory = searchParams.get("category");

  const handleClick = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    const categoryLower = category.toLowerCase();

    if (currentCategory === categoryLower) {
      newParams.delete("category");
    } else {
      newParams.set("category", categoryLower);
    }
    const newSearchQuery = newParams.toString();
    const path = newSearchQuery
      ? `/products/filter?${newSearchQuery}`
      : "/products/filter";
    navigate(path, { replace: true });
  };

  return (
    <main className="text-black bg-gray-200 py-2 px-3 mb-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Menu />
          <p className="text-lg font-bold">Categories</p>
        </div>
        <div className="flex items-center gap-4 text-base">
          {categories.map((category, index) => (
            <p
              key={index}
              onClick={() => handleClick(category)}
              className={`cursor-pointer ${
                currentCategory === category.toLowerCase()
                  ? "underline font-bold"
                  : ""
              }`}
            >
              {category}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SecondaryBar;
