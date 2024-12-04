import ReviewTitleRightItems from "./ReviewTitleRightItems";

const ReviewHeaderTitle = ({ item }) => {
  return (
    <div className="review-title-header">
      <div className="review-title-left">
        <div className="review-write-date">작성일자</div>
        <div className="review-write-nickname">닉네임</div>
      </div>
      <ReviewTitleRightItems item={item} />
    </div>
  );
};

export default ReviewHeaderTitle;
