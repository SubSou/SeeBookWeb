const ReviewTitleRightItem = ({ item, index }) => {
  return (
    <div className="review-title-item-box">
      <div className="review-title-item" key={index}>
        <div className="review-write-date">{item.createDate}</div>
        <div className="review-write-nickname">{item.nickname}</div>
      </div>
      <div className="review-hide-bar-box">
        <div className="review-hide-bar"></div>
      </div>
    </div>
  );
};
export default ReviewTitleRightItem;
