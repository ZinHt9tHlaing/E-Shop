import { useRef, type ChangeEvent } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface ImageUploadProps {
  images: Array<{ url: string; file?: File; public_alt?: string }>;
  onChange: (
    images: Array<{ url: string; file?: File; public_alt?: string }>
  ) => void;
}

const ImageUpload = ({ images, onChange }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file), // store in objectUrl
    }));

    onChange([...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];

    if (images[index].url.startsWith("blob")) {
      const objectUrl = images[index].url;
      URL.revokeObjectURL(objectUrl); // delete in objectUrl each image with index
    }

    newImages.splice(index, 1); // delete a image with index
    onChange(newImages);
  };

  return (
    <div>
      <div className="grid grid-cols-5 gap-4 mb-2">
        {images.map((img, index) => (
          <div key={index} className="relative group">
            <img
              src={img.url}
              alt={`Preview ${index + 1}`}
              className={`w-full h-16 lg:h-32 object-cover rounded-lg ${
                img.file && "border-2 border-black"
              }`}
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute cursor-pointer top-1 right-1 flex items-center justify-center size-6 lg:size-10 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity active:ring-1 active:ring-gray-400 duration-100"
            >
              <X className="w-3 h-3 lg:w-4 lg:h-4" />
            </button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant={"outline"}
        onClick={() => fileInputRef.current?.click()}
        className="cursor-pointer active:ring-2 active:ring-gray-400 duration-150"
      >
        Add Images
      </Button>
      <input
        type="file"
        id="image-upload"
        ref={fileInputRef}
        multiple
        accept="image"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
