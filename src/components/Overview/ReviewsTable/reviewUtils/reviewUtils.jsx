export function isValidReview(review) {
  if (!review) return false;

  const stars = Number(review.stars);

  return (
    !Number.isNaN(stars) &&
    stars > 0 &&
    !!review.date &&
    !Number.isNaN(new Date(review.date).getTime())
  );
}

export function getReviewStars(review) {
  return Number(review.stars);
}