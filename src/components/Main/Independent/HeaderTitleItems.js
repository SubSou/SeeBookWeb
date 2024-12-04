import React, { useState } from "react";
import HeaderMenuItem from "./HeaderMenuItem";
import HeaderRightItems from "./HeaderRightItems";
import { useNavigate } from "react-router-dom";
import { MainPaths } from "../../../navigation/routes";
import { useMainContext } from "../../../contexts/MainContext";

export const initTitle = { label: "전체", value: "all" };

export const subDropDowmLists = {
  userinfo: [
    initTitle,
    { label: "이메일", value: "email" },
    { label: "이름", value: "name" },
    { label: "닉네임", value: "nickname" },
    { label: "성별", value: "gender" },
    { label: "등급", value: "role" },
  ],
  review: [
    initTitle,
    { label: "닉네임", value: "nickname" },
    { label: "제목", value: "title" },
    { label: "저자", value: "author" },
    { label: "내용", value: "content" },
  ],

  report: [
    initTitle,
    { label: "신고자", value: "reporter" },
    { label: "피신고자", value: "reported" },
    { label: "신고종류", value: "reportType" },
  ],
  event: [initTitle, { label: "제목", value: "title" }],
  customer: [
    initTitle,
    { label: "이메일", value: "email" },
    { label: "이름", value: "name" },
    { label: "닉네임", value: "nickname" },
    { label: "문의유형", value: "SUPPORTTYPE" },
    { label: "처리유무", value: "processed" },
  ],
};

const HeaderTitleItems = () => {
  const { isDrop, setIsDrop, title, setTitle, activeIndex, setActiveIndex } =
    useMainContext();

  // 클릭된 항목의 인덱스를 저장할 상태

  const navigation = useNavigate();

  const changeSubPage = () => {
    if (title.value !== "all") {
      setTitle(initTitle);
    }

    if (isDrop) {
      setIsDrop(!isDrop);
    }
  };

  const goToUserInfo = () => {
    changeSubPage();
    navigation(MainPaths.MainUserInfo);
  };

  const goToReview = () => {
    changeSubPage();
    navigation(MainPaths.MainReview);
  };

  const goToReport = () => {
    changeSubPage();
    navigation(MainPaths.MainReport);
  };

  const goToEvent = () => {
    changeSubPage();
    navigation(MainPaths.MainEvent);
  };

  const goToCustomer = () => {
    changeSubPage();
    navigation(MainPaths.MainCustomer);
  };

  // 메뉴 항목 배열
  const menuItems = [
    { label: "사용자 정보 목록", pressFunc: goToUserInfo },
    { label: "리뷰 관리", pressFunc: goToReview },
    { label: "신고 관리", pressFunc: goToReport },
    { label: "이벤트 관리", pressFunc: goToEvent },
    { label: "고객 문의", pressFunc: goToCustomer },
  ];

  // 항목을 클릭할 때 호출될 함수
  const handleClick = (index) => {
    setActiveIndex(index); // 클릭된 항목의 인덱스를 상태로 설정
    menuItems[index].pressFunc();
  };

  return (
    <div className="header-title">
      <div className="header-left-item">
        <HeaderMenuItem
          menuItems={menuItems}
          activeIndex={activeIndex}
          handleClick={handleClick}
        />
      </div>
      <div className="header-right-item">
        <HeaderRightItems />
      </div>
    </div>
  );
};

export default HeaderTitleItems;
