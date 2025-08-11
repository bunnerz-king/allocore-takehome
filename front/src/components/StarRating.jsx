import { useState } from "react";

export const StarRating = ({ value, onChange, disabled }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex text-2xl">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hovered || value);
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className={`cursor-pointer 
               ${
              disabled ? "pointer-events-none" : ""}
              ${
              isFilled ? "text-yellow-500" : "text-gray-500/50"
            }`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}