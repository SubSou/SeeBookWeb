import DetailInput from "../Common/DetailInput";
import DetailResetBtn from "./../Common/DetailResetBtn";

const UserInfoDetailNickNameBox = ({ text, handleText, isRest, handeFunc }) => {
  return (
    <div className="userinfo-box">
      <div>닉&nbsp;&nbsp;네&nbsp;&nbsp;임</div>
      <DetailInput text={text} handleText={handleText} disabled={isRest} />
      <DetailResetBtn title={"초기화"} isRest={isRest} handleFunc={handeFunc} />
    </div>
  );
};

export default UserInfoDetailNickNameBox;
