import ReviewTitleRightItem from "./ReviewTitleRightItem";

const ReviewTitleRightItems = ({ item }) => {
  return (
    <div className="review-title-right">
      {item.map((item, index) => (
        <ReviewTitleRightItem key={index} item={item} index={index} />
      ))}
    </div>
  );
};

export default ReviewTitleRightItems;
