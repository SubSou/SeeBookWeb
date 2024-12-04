import DetailInput from "../Common/DetailInput";
import DetailResetBtn from "../Common/DetailResetBtn";

const UserInfoDetailPassword = ({
  text,
  password,
  isPassword,
  isRest,
  handleFunc,
}) => {
  return (
    <div className="userinfo-box">
      <div style={{ flexShrink: 0 }}>&nbsp;비밀번호</div>
      {isPassword ? (
        <></>
      ) : (
        // <DetailInput text={text} handleText={handeFunc} type="password" />
        <div className="userinfo-hide-text">{password}</div>
      )}
      <DetailResetBtn
        title={"비밀번호 초기화"}
        isRest={isRest}
        handleFunc={handleFunc}
      />
    </div>
  );
};

export default UserInfoDetailPassword;
