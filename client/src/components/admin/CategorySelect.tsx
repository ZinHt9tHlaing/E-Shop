import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySelectProps {
  value?: string;
  onChange: (value: string) => void;
}

const CATEGORIES = [
  {
    id: "t-shirt",
    label: "T-shirt",
  },
  {
    id: "hoodie",
    label: "Hoodie",
  },
  {
    id: "shorts",
    label: "Shorts",
  },
  {
    id: "jeans",
    label: "Jeans",
  },
];

const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          {CATEGORIES.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
