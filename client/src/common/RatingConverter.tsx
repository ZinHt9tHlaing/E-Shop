import { Star } from "lucide-react";

interface RatingConverterProps {
  count: number;
}

function RatingConverter({ count }: RatingConverterProps) {
  return (
    <div className="flex items-center gap-1 mb-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`size-4 ${
            count >= index + 1
              ? "fill-yellow-400 text-yellow-400"
              : "text-yellow-500"
          }`}
        />
      ))}
    </div>
  );
}

export default RatingConverter;
