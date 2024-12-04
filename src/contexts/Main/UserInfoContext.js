import { createContext, useContext, useState } from "react";

const UserInfoContext = createContext();

export const useUserInfoContext = () => useContext(UserInfoContext);

export const UserInfoProvider = ({ children }) => {
  const value = {};

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
};
