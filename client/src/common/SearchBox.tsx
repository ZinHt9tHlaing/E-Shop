import { Search, X } from "lucide-react";

const SearchBox = () => {
  return (
    <div className="md:w-96 relative">
      <form>
        <input className="bg-gray-200 focus:outline-0 py-2 ps-10 text-black text-sm w-full rounded-full focus:ring-1 focus:ring-yellow-500 focus:outline-none focus:border focus:border-yellow-500" />

        <Search className="absolute top-1.5 left-2 text-black" />
        <X className="size-5 select-none absolute top-1.5 right-2 text-black cursor-pointer active:scale-90 duration-200" />
      </form>
    </div>
  );
};

export default SearchBox;
