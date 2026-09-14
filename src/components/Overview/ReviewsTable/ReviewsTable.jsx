import { useMemo } from "react";

import Rating from "@mui/material/Rating";
import TableSortLabel from "@mui/material/TableSortLabel";

import Table from "../../common/Table/Table";

import {
  isValidReview,
  getReviewStars,
} from "./reviewUtils/reviewUtils";

import "./ReviewsTable.css";

const ReviewsTable = ({ reviews, onView }) => {

  const validReviews = useMemo(() => {

    const filteredReviews = (reviews || [])
      .filter(isValidReview);

    return [...filteredReviews].sort((a, b) => {

      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateB - dateA;

    });

  }, [reviews]);


  const columns = [
    {
      id: "date",
      label: (
        <TableSortLabel
          active={true}
          direction="desc"
          hideSortIcon={false}
        >
          Date
        </TableSortLabel>
      ),
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
  ];


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