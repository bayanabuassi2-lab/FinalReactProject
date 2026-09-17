import { useMemo } from "react";

import Rating from "@mui/material/Rating";

import Table from "../../common/Table/Table";

import {
  isValidReview,
  getReviewStars,
} from "./reviewUtils/reviewUtils";

import "./ReviewsTable.css";

const ReviewsTable = ({ reviews, onView }) => {
  const validReviews = useMemo(() => {
    return (reviews || []).filter(isValidReview);
  }, [reviews]);

  const columns = useMemo(
    () => [
      {
        id: "date",
        label: "Date",
        defaultOrder: "desc",
        sortValue: (review) => new Date(review.date),
        render: (review) =>
          new Date(review.date).toLocaleDateString(),
      },

      {
        id: "rating",
        label: "Rating",
        render: (review) => (
          <Rating
            value={getReviewStars(review)}
            readOnly
            size="small"
          />
        ),
      },

      {
        id: "notes",
        label: "Notes",
        render: (review) => (
          <span
            className="view-link"
            onClick={() => onView(review)}
          >
            View
          </span>
        ),
      },
    ],
    [onView]
  );

  return (
    <Table
      columns={columns}
      rows={validReviews}
      emptyMessage="No reviews yet"
      className="reviews-table"
    />
  );
};

export default ReviewsTable;