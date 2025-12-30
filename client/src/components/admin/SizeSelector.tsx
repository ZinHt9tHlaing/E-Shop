import { Button } from "../ui/button";

interface SizeSelectorProps {
  sizes: string[];
  onChange: (value: string[]) => void;
}

const SizeSelector = ({ sizes, onChange }: SizeSelectorProps) => {
  const availableSizes = ["xs", "sm", "lg", "xl", "xxl"];

  const toggleSize = (selectedSize: string) => {
    if (sizes.includes(selectedSize)) {
      onChange(sizes.filter((size) => size !== selectedSize));
    } else {
      onChange([...sizes, selectedSize]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {availableSizes.map((size, index) => (
        <Button
          key={index}
          type="button"
          variant={"outline"}
          onClick={() => toggleSize(size)}
          className={`cursor-pointer active:ring-2 active:border-2 active:border-gray-400 active:ring-gray-400 duration-150 ${
            sizes.includes(size) &&
            "bg-black text-white hover:bg-black hover:text-white"
          }`}
        >
          {size.toUpperCase()}
        </Button>
      ))}
    </div>
  );
};

export default SizeSelector;
