import { useMemo } from "react";
import Rating from "@mui/material/Rating";
import "./AverageRating.css";

function AverageRating({ reviews }) {
  const validReviews = useMemo(() => {
    return (reviews || []).filter(
      (review) =>
        review &&
        !Number.isNaN(Number(review.stars)) &&
        Number(review.stars) > 0
    );
  }, [reviews]);

  const { total, averageRating } = useMemo(() => {
    const total = validReviews.reduce(
      (sum, review) => sum + Number(review.stars),
      0
    );

    const averageRating =
      validReviews.length > 0
        ? total / validReviews.length
        : 0;

    return {
      total,
      averageRating,
    };
  }, [validReviews]);

  return (
    <div className="overview-rating">
      <p className="rating-label">Average Rating</p>

      <Rating
        value={averageRating}
        precision={0.5}
        readOnly
      />
    </div>
  );
}

export default AverageRating;