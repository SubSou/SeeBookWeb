import DetailResetBtn from "../Common/DetailResetBtn";

const UserInfoDetailImg = ({ imgurl, isRest, handleFunc }) => {
  return (
    <div className="userinfo-detail-img-box">
      <div className="userinfo-detail-img">
        <img src={imgurl} />
      </div>
      <DetailResetBtn
        title={"사진 초기화"}
        isRest={isRest}
        handleFunc={handleFunc}
      />
    </div>
  );
};

export default UserInfoDetailImg;
