import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const SearchBox = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialKeyword = searchParams.get("keyword") || "";
  const [keyword, setKeyword] = useState(initialKeyword);

  useEffect(() => {
    const urlKeyword = searchParams.get("keyword") || "";
    setKeyword(urlKeyword);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateKeywordInUrl(keyword.trim());
  };

  const updateKeywordInUrl = (newKeyword: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (newKeyword) {
      newParams.set("keyword", newKeyword);
    } else {
      newParams.delete("keyword");
    }
    const newSearchQuery = newParams.toString();
    const path = newSearchQuery
      ? `/products/filter?${newSearchQuery}`
      : "/products/filter";
    navigate(path, { replace: true });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);

    if (value === "" && searchParams.get("keyword")) {
      updateKeywordInUrl("");
    }
  };

  const handleClear = () => {
    setKeyword("");
    updateKeywordInUrl("");
  };

  return (
    <div className="relative w-44 sm:w-60 md:w-72 lg:w-96">
      <form onSubmit={handleSearch}>
        <input
          value={keyword}
          onChange={handleInputChange}
          // placeholder="Search products..."
          className="w-full bg-gray-200 text-black rounded-full ps-10 pe-10 py-1 md:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-500
          "
        />

        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 sm:size-5 text-black" />

        {keyword && (
          <X
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 size-4 sm:size-5 text-black cursor-pointer"
          />
        )}
      </form>
    </div>
  );
};

export default SearchBox;
