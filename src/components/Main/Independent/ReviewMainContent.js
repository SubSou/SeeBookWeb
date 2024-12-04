import ReviewMainLeftItems from "./ReviewMainLeftItems";
import ReviewMainRightItems from "./ReviewMainRightItems";

const ReviewMainContent = ({ item, handleReviewDelete }) => {
  return (
    <div className="review-main">
      <ReviewMainLeftItems />

      <ReviewMainRightItems
        item={item}
        handleReviewDelete={handleReviewDelete}
      />
    </div>
  );
};

export default ReviewMainContent;
