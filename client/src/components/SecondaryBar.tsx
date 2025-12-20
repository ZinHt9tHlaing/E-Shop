import { Menu } from "lucide-react";

const categories = ["T-shirt", "Hoodie", "Shorts", "Jeans"];

const SecondaryBar = () => {
  return (
    <main className="text-black bg-gray-200 py-2 px-3 mb-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Menu />
          <p className="text-lg font-bold">Categories</p>
        </div>
        <div className="flex items-center gap-4 font-medium text-base">
          {categories.map((category, index) => (
            <p key={index} className={"cursor-pointer font-bold underline"}>
              {category}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SecondaryBar;
