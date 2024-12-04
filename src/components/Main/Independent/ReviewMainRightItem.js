import DeleteBtn from "../Common/DeleteBtn";

const ReviewMainRightItem = ({ item, handleReviewDelete }) => {
  function convertToPercentage(rating) {
    return (rating / 5) * 100;
  }

  const rating = convertToPercentage(item.starRating) + "%";

  const handleDelete = () => {
    handleReviewDelete(item.reviewId);
  };

  return (
    <div className="review-main-item-box">
      <div className="review-main-title">{item.title}</div>
      <div className="review-star">
        <div style={{ width: rating }} className="review-star-fill">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="review-star-base">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="review-sub-title">{item.author}</div>
      <div className="review-sub-title">{item.content}</div>
      <div className="review-delete">
        <DeleteBtn handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default ReviewMainRightItem;
