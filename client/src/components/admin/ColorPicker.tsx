import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface ColorPickerProps {
  colors: string[];
  onChange: (value: string[]) => void;
}

const ColorPicker = ({ colors, onChange }: ColorPickerProps) => {
  const [inputColor, setInputColor] = useState("#000000");

  const addColor = () => {
    if (!colors?.includes(inputColor)) {
      onChange([...colors, inputColor]);
    }
  };

  const removeColor = (selectedColor: string) => {
    onChange(colors.filter((color) => color !== selectedColor));
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="color"
          value={inputColor}
          onChange={(e) => setInputColor(e.target.value)}
          className="w-32 h-10"
        />
        <Button
          type="button"
          className="cursor-pointer active:ring-2 active:ring-gray-500 duration-150"
          onClick={addColor}
        >
          Add color
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {colors.map((color, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-1 p-2 rounded-md border"
          >
            <div
              style={{ backgroundColor: color }}
              className="size-6 rounded-full border"
            />
            <span className="text-sm px-2">{color}</span>
            <Button
              type="button"
              onClick={() => removeColor(color)}
              size={"sm"}
              variant={"outline"}
              className="cursor-pointer active:ring-1 active:ring-gray-600 duration-150"
            >
              <X size={16} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
