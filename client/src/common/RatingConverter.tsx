import { Star } from "lucide-react";

interface RatingConverterProps {
  count: number;
  max?: number;
}

function RatingConverter({ count, max = 5 }: RatingConverterProps) {
  return (
    <div className="flex items-center gap-1 mb-2">
      {Array.from({ length: max }).map((_, index) => (
        <Star
          key={index}
          className={`size-4 ${
            count >= index + 1 // starts from 1 and at least 1 star
              ? "fill-yellow-400 text-yellow-400"
              : "text-yellow-500"
          }`}
        />
      ))}
    </div>
  );
}

export default RatingConverter;
