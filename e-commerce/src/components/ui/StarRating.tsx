import { StarIcon } from "./Icons";

interface StarRatingProps {
  rating: number;
  reviews?: number;
}

export default function StarRating({ rating, reviews }: StarRatingProps) {
  const rounded = Math.round(rating);
  return (
    <div
      className="flex items-center gap-1.5"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      <span className="flex gap-px">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon
            key={i}
            width={10}
            height={10}
            className={i < rounded ? "text-brand-500" : "text-gray-300"}
          />
        ))}
      </span>
      {reviews !== undefined && (
        <span className="text-[10px] text-muted">({reviews})</span>
      )}
    </div>
  );
}
