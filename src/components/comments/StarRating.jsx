import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";

function StarRating({ modeRate = true, displayRate = 0, showRatingText = false }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    if (!modeRate) {
      setRating(displayRate);
    }
  }, [modeRate, displayRate]);

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={ratingValue} className="inline-block">
            {modeRate && (
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                className="hidden"
              />
            )}
            <FaStar
              size={20}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={modeRate ? () => setHover(ratingValue) : undefined}
              onMouseLeave={modeRate ? () => setHover(null) : undefined}
              style={{ cursor: modeRate ? "pointer" : "default" }}
            />
          </label>
        );
      })}
      {showRatingText && (
        <p className="ml-2 text-sm font-medium text-gray-700">{rating || 0}/5</p>
      )}
    </div>
  );
}

export default StarRating;