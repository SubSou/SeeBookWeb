import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleTokenExpiry = () => {
    alert("유효시간이 만료되었습니다. 다시 로그인해주세요.");
  };

  const handleSystemError = () => {
    alert("시스템에 오류가 발생했습니다. 다시 시도해주세요.");
  };

  const value = { user, setUser, handleTokenExpiry, handleSystemError };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
