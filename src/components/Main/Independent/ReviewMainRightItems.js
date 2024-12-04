import ReviewMainRightItem from "./ReviewMainRightItem";

const ReviewMainRightItems = ({ item, handleReviewDelete }) => {
  return (
    <div className="review-main-right">
      {item.map((item, index) => (
        <ReviewMainRightItem
          key={index}
          item={item}
          handleReviewDelete={handleReviewDelete}
        />
      ))}
    </div>
  );
};

export default ReviewMainRightItems;
