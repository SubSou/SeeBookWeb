import {
  LIGHTGRAY,
  MEDIUMGRAY,
  SIGNATURECOLOR,
  WHITE,
} from "../../../color/color";

const LoginBtn = ({ isBtnActive, pressFunc }) => {
  return (
    <button
      onClick={pressFunc}
      className="main-btn"
      style={{
        backgroundColor: isBtnActive ? SIGNATURECOLOR : LIGHTGRAY,
      }}
    >
      <span style={{ color: isBtnActive ? WHITE : MEDIUMGRAY }}>로그인</span>
    </button>
  );
};

export default LoginBtn;
