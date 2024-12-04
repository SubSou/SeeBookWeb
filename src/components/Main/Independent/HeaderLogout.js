import { useNavigate } from "react-router-dom";
import { requestMainLogout } from "../../../api/Main/Api";
import { useUserContext } from "../../../contexts/UserContext";
import LogoutIcon from "./LogoutIcon";
import LogoutTitle from "./LogoutTitle";
import Cookies from "js-cookie";
const HeaderLogout = () => {
  const navigation = useNavigate();
  const { user, handleSystemError } = useUserContext();

  const token = Cookies.get("token");
  const handleMainLogout = async () => {
    console.log(user);
    const statusData = await requestMainLogout(token, user.data.provider);
    if (window.confirm("정말로 로그아웃 하시겠습니까?")) {
      if (statusData === 200) {
        navigation("/", { replace: true });
      } else {
        handleSystemError();
      }
    }
  };

  return (
    <div onClick={handleMainLogout} className="logout">
      <LogoutIcon />
      <LogoutTitle />
    </div>
  );
};

export default HeaderLogout;
