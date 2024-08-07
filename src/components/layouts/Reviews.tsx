import { GetAllReviews } from "../../types/types.model";
import ReviewCard from "./ReviewCard";
interface ReviewsProps {
  review: GetAllReviews;
}
const Reviews = ({ review }: ReviewsProps) => {
  return (
    <>
      {" "}
      {review && (
        <>
          <ReviewCard key={review.id} review={review} />
        </>
      )}
    </>
  );
};

export default Reviews;
