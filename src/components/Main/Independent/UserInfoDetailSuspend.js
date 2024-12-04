import DetailResetBtn from "../Common/DetailResetBtn";
import { NEARGRAY } from "./../../../color/color";

const UserInfoDetailSuspend = ({ suspend, openChdate, date }) => {
  console.log(suspend);
  return (
    <div className="userinfo-box">
      <div>정지&nbsp;기간</div>
      {suspend ? (
        <div>{"123 ~ " + date}</div>
      ) : (
        <div style={{ color: NEARGRAY }}>현재 계정은 정지 상태가 아닙니다</div>
      )}
      {suspend ? (
        <DetailResetBtn title={"수정"} handleFunc={openChdate} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserInfoDetailSuspend;
