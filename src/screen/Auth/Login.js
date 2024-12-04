import { useEffect, useState } from "react";
import Input from "../../components/Auth/Common/Input";
import "../../css/Auth/login.css";

import LoginIconImg from "../../components/Auth/Independent/LoginIconImg";
import LoginBtn from "../../components/Auth/Independent/LoginBtn";
import { requestAuthLogin } from "../../api/Auth/Api";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const { setUser, handleTokenExpiry, handleSystemError } = useUserContext();

  const navigation = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [isBtnActive, setIsBtnActive] = useState(false);

  const falseLogin = () => {
    alert("아이디 또는 비밀번호가 일치하지 않습니다.");
  };

  const handleIdInputChange = (id) => {
    setId(id);
  };

  const handlePasswordInputChange = (password) => {
    setPassword(password);
  };

  const handleLogin = async () => {
    const { statusData, header, ...data } = await requestAuthLogin(
      id,
      password
    );

    if (statusData === 200) {
      setUser({
        ...data,
        header,
      });
      Cookies.set("token", header, { expires: 1 });

      navigation("/Main/userinfo");
    } else if (statusData === 400) {
      falseLogin();
    } else if (statusData === 401) {
      handleTokenExpiry();
    } else {
      handleSystemError();
    }
  };

  useEffect(() => {
    if (id.length > 0 && password.length > 0) {
      setIsBtnActive(true);
    } else {
      setIsBtnActive(false);
    }
  }, [id, password]);

  return (
    <div className="login">
      <div className="login-con">
        <div className="header-wrap">
          <LoginIconImg />
        </div>
        <div className="login-main-wrap ">
          <Input
            placeholder={"관리자 아이디"}
            value={id}
            onChange={handleIdInputChange}
          />
          <Input
            placeholder={"관리자 비밀번호"}
            value={password}
            type={"password"}
            marginTop={53}
            onChange={handlePasswordInputChange}
          />
          <LoginBtn isBtnActive={isBtnActive} pressFunc={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default Login;
