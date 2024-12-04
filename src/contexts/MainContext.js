import { createContext, useContext, useEffect, useState } from "react";

const MainContext = createContext();

export const initDropSubItems = [
  { label: "전체", value: "all" },
  { label: "이메일", value: "email" },
  { label: "이름", value: "name" },
  { label: "닉네임", value: "nickname" },
  { label: "성별", value: "gender" },
  { label: "등급", value: "role" },
];

export const useMainContext = () => useContext(MainContext);

export const MainProvider = ({ children }) => {
  const [isDrop, setIsDrop] = useState(false);
  const [title, setTitle] = useState({ label: "전체", value: "all" });
  const [isClick, setIsClick] = useState(false);
  const [dropSubItems, setDropSubItems] = useState(initDropSubItems);
  const [searchText, setSearchText] = useState("");
  const [activeIndex, setActiveIndex] = useState(0); // 사용자 정보 목록, 리뷰 관리 등 헤더 에서 사용하는 상태 변수

  const [isInfoDetail, setIsInfoDetail] = useState(false);

  const handleSearchText = (text) => {
    setSearchText(text);
  };

  const value = {
    isDrop,
    setIsDrop,
    title,
    setTitle,
    dropSubItems,
    setDropSubItems,
    isClick,
    setIsClick,
    searchText,
    handleSearchText,
    isInfoDetail,
    setIsInfoDetail,
    activeIndex,
    setActiveIndex,
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
