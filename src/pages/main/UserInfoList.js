import React, { useEffect, useState } from "react";
import UserInfoTitle from "../../components/Main/Independent/UserInfoTitle";
import { useUserContext } from "../../contexts/UserContext";
import MainContent from "../../wrapper/MainContent";
import {
  requestMainDeleteUser,
  requestMainLogout,
  requestMainUserInfoDetail,
  requestMainUserInfoList,
} from "../../api/Main/Api";
import PageBtnWrap from "../../components/Main/Independent/PageBtnWrap";
import MainContentTop from "../../wrapper/Main/MainContentTop";
import MainContentBottom from "../../wrapper/Main/MainContentBottom";
import MainContentList from "../../wrapper/Main/MainContentList";
import UserInfoContentItems from "../../components/Main/Independent/UserInfoContentItems";
import Cookies from "js-cookie";
import { useMainContext } from "../../contexts/MainContext";
import { subDropDowmLists } from "../../components/Main/Independent/HeaderTitleItems";
import { contentTitleNames } from "../../components/Main/Common/ContentTitleItems";
import MainContentDetail from "../../wrapper/Main/MainContentDetail";
import UserInfoDetail from "../../components/Main/Independent/UserInfoDetail";
import MainNonItem from "../../components/Main/Common/MainNonItem";
import { useNavigate } from "react-router-dom";

const pageNum = 3;

const searchGenderValidate = ["MALE", "FEMALE"];
const searchRoleValidate = ["관리자", "사용자"];

const UserInfoList = React.memo(() => {
  const token = Cookies.get("token");

  const { handleTokenExpiry, handleSystemError } = useUserContext();
  const {
    setDropSubItems,
    isClick,
    setIsClick,
    searchText,
    title,
    setActiveIndex,
  } = useMainContext();

  const [infoUserDatas, setInfoUserDatas] = useState(null);
  const [endPage, setEndPage] = useState(null);

  const [pageData, setPageData] = useState([]);
  const [prevBtnActive, setPrevBtnActivie] = useState(false); // 이전 버튼 활성화 토글
  const [nextBtnActive, setNextBtnActivie] = useState(false); // 다음 버튼 활성화 토글

  const [currentPage, setCurrentpage] = useState(1);

  const [isUserInfoDetail, setIsUserInfoDetail] = useState(false);
  const [userInfoDetailData, setUserInfoDetailData] = useState(null);
  const [updateUserData, setUpdateUserData] = useState(null);

  const [isChecked, setIsChecked] = useState(false); // 전체 선택하는 체크박스

  useEffect(() => {
    if (updateUserData) {
      setInfoUserDatas(false);
      setUpdateUserData(null);
    }
  }, [updateUserData]);

  useEffect(() => {
    if (userInfoDetailData !== null) {
      setIsUserInfoDetail(true);
    }
  }, [userInfoDetailData]);

  const initFormat = () => {
    setActiveIndex(0);
    setDropSubItems(subDropDowmLists[contentTitleNames.userInfo]);
  };

  const handleToggleUserInfoDetail = async (userId) => {
    const { statusData, ...responseData } = await requestMainUserInfoDetail(
      token,
      userId
    );
    console.log(responseData);
    if (statusData === 200) {
      setUserInfoDetailData(responseData.data);
    } else if (statusData === 400) {
      alert("존재하지 않는 유저 입니다.");
    } else if (statusData === 401) {
      handleTokenExpiry();
    } else {
      handleSystemError();
    }
  };

  const validateSearchText = (formatData) => {
    if (title.value === "role") {
      if (searchRoleValidate.includes(formatData.trim())) {
        return 200;
      } else {
        alert("관리자 또는 사용자를 입력해주세요.");
        return 400;
      }
    } else if (title.value === "gender") {
      if (searchGenderValidate.includes(formatData.trim())) {
        return 200;
      } else {
        alert("MALE 또는 FEMALE를 입력해주세요");
        return 400;
      }
    } else {
      return 200;
    }
  };

  useEffect(() => {
    initFormat();

    const fetchData = async () => {
      try {
        const { statusData, ...responseData } = await requestMainUserInfoList(
          token,
          1,
          "all",
          "all"
        );

        // Add isChecked: false to each user object
        const updatedUsers = responseData.data.user.map((user) => ({
          ...user,
          isChecked: false,
        }));

        setInfoUserDatas(updatedUsers);
        if (responseData.data.totalUserCount % 5 === 0) {
          setEndPage(responseData.data.endPage - 1);
        } else {
          setEndPage(responseData.data.endPage);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (endPage !== null) {
      let initBtnData = [];
      for (let i = 0; i < endPage && i < pageNum; i++) {
        initBtnData.push(i + 1);
      }
      setPageData(initBtnData);

      if (endPage < pageNum + 1) {
        setNextBtnActivie(false);
      } else {
        setNextBtnActivie(true);
      }
    }
  }, [endPage]);

  useEffect(() => {
    if (isClick) {
      const handleSearch = async () => {
        try {
          let formatSearchData = searchText === "" ? "all" : searchText;

          if (validateSearchText(formatSearchData) === 200) {
            const { statusData, ...responseData } =
              await requestMainUserInfoList(
                token,
                1,
                title.value,
                formatSearchData
              );

            // Add isChecked: false to each user object
            const updatedUsers = responseData.data.user.map((user) => ({
              ...user,
              isChecked: false,
            }));

            setInfoUserDatas(updatedUsers);
            if (responseData.data.totalUserCount % 5 === 0) {
              setEndPage(responseData.data.endPage - 1);
            } else {
              setEndPage(responseData.data.endPage);
            }
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsClick(false);
        }
      };
      handleSearch();
    }
  }, [isClick]);

  const handleSupportLists = async (currentPage) => {
    try {
      const token = Cookies.get("token");
      let formatSearchData = searchText === "" ? "all" : searchText;

      const { statusData, ...responseData } = await requestMainUserInfoList(
        token,
        currentPage,
        title.value,
        formatSearchData
      );

      return responseData;
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageBtnSelect = async (pageNumer) => {
    try {
      const token = Cookies.get("token");
      let formatSearchData = searchText === "" ? "all" : searchText;

      const { statusData, ...responseData } = await requestMainUserInfoList(
        token,
        pageNumer,
        title.value,
        formatSearchData
      );

      // Add isChecked: false to each user object
      const updatedUsers = responseData.data.user.map((user) => ({
        ...user,
        isChecked: false,
      }));
      setIsChecked(false);
      setIsClick(false);
      setInfoUserDatas(updatedUsers);
      if (responseData.data.totalUserCount % 5 === 0) {
        setEndPage(responseData.data.endPage - 1);
      } else {
        setEndPage(responseData.data.endPage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageBtn = async (papgeNumber) => {
    setCurrentpage(papgeNumber);
    handlePageBtnSelect(papgeNumber);
  };

  const handleIsUserInfoDetailClose = () => {
    setIsUserInfoDetail(false);
  };

  const handleUpdateUserInfo = (userId, newNickname, newGender, newRole) => {
    setInfoUserDatas((prevData) =>
      prevData.map(
        (user) =>
          user.userId === userId
            ? {
                ...user,
                nickname: newNickname,
                gender: newGender,
                role: newRole,
              } // 기존 속성 유지
            : user // 나머지 사용자는 그대로 유지
      )
    );
  };

  const handelPrevBtnPage = () => {
    if (prevBtnActive) {
      const prevBtnData = pageData[0] - 3;
      setPageData(() => {
        let chBtnData = [];

        for (
          let i = prevBtnData;
          i < prevBtnData + pageNum && i <= endPage;
          i++
        ) {
          chBtnData.push(i);
        }

        setCurrentpage(chBtnData[chBtnData.length - 1]);
        handlePageBtn(chBtnData[chBtnData.length - 1]);

        if (chBtnData[0] === 1) {
          setPrevBtnActivie(false);
          setNextBtnActivie(true);
        } else {
          setPrevBtnActivie(true);
        }

        return chBtnData;
      });
    }
  };

  const handelNextBtnPage = () => {
    let firstBtnNumber = pageData[pageData.length - pageNum]; // 첫 번째 수

    if (firstBtnNumber + pageNum <= endPage && nextBtnActive) {
      setPrevBtnActivie(true);
      let lastBtnNumber = pageData[pageData.length - 1];

      setPageData(() => {
        let chBtnData = [];
        let firstNumber = lastBtnNumber + 1;
        for (
          let i = lastBtnNumber + 1;
          i < lastBtnNumber + 1 + pageNum && i <= endPage;
          i++
        ) {
          chBtnData.push(i);
        }

        setCurrentpage(chBtnData[0]);

        handlePageBtn(chBtnData[0]);

        if (firstNumber + pageNum < endPage) {
          setNextBtnActivie(true);
        } else {
          setNextBtnActivie(false);
        }

        return chBtnData;
      });
    } else {
      alert("마지막 페이지 입니다.");
    }
  };

  const handleTitleCheckBox = (checked) => {
    setIsChecked(checked);
    setInfoUserDatas((prevData) => {
      return prevData.map((user) => ({
        ...user,
        isChecked: checked,
      }));
    });
  };

  const handleContentCheckBox = (check, userId) => {
    setInfoUserDatas((prevData) =>
      prevData.map((user) =>
        user.userId === userId ? { ...user, isChecked: check } : user
      )
    );
  };

  const handleAfterDeleteReport = async (userIds) => {
    if (parseInt(userIds.length) - parseInt(infoUserDatas.length) === 0) {
      if (currentPage - 1 === 0) {
        setInfoUserDatas([]);
      } else {
        const responseData = await handleSupportLists(currentPage - 1);
        setCurrentpage(currentPage - 1);
        // Add isChecked: false to each user object
        const updatedUsers = responseData.data.user.map((user) => ({
          ...user,
          isChecked: false,
        }));
        setIsChecked(false);
        setIsClick(false);
        setInfoUserDatas(updatedUsers);
        if (responseData.data.totalUserCount % 5 === 0) {
          setEndPage(responseData.data.endPage - 1);
        } else {
          setEndPage(responseData.data.endPage);
        }
      }
    } else {
      const filteredReportDatas = infoUserDatas?.filter(
        (data) => !userIds.includes(data.userId)
      );

      setInfoUserDatas(filteredReportDatas);
    }
    alert("삭제가 완료 되었습니다.");
  };

  const handleDeleteUser = async () => {
    const userId = infoUserDatas
      ?.filter((data) => data.isChecked) // isChecked가 true인 항목만 필터링
      .map((data) => data.userId); // 해당 항목의 reportId만 추출
    const deleUserName = infoUserDatas
      ?.filter((data) => data.isChecked) // isChecked가 true인 항목만 필터링
      .map((data) => data.name); // 해당 항목의 reportId만 추출

    if (window.confirm(`${deleUserName}유저를 삭제하시겠습니까?`)) {
      const statusData = await requestMainDeleteUser(token, userId);
      if (statusData === 200) {
        await handleAfterDeleteReport(userId);
      } else if (statusData === 401) {
        handleTokenExpiry();
      } else {
        handleSystemError();
      }
    }
  };

  if (infoUserDatas === null) {
    return <div></div>;
  }

  if (infoUserDatas.length < 1) {
    return <MainNonItem title={"현재 가입된 유저가 없습니다."} />;
  }

  return (
    <MainContent>
      <MainContentTop>
        <UserInfoTitle
          isChecked={isChecked}
          handleTitleCheckBox={handleTitleCheckBox}
          handleDeleteUser={handleDeleteUser}
        />
        <MainContentList>
          <UserInfoContentItems
            datas={infoUserDatas}
            handleContentCheckBox={handleContentCheckBox}
            handleToggleUserInfoDetail={handleToggleUserInfoDetail}
          />
        </MainContentList>
      </MainContentTop>
      <MainContentBottom>
        <PageBtnWrap
          pageData={pageData}
          handelNextBtnPage={handelNextBtnPage}
          handelPrevBtnPage={handelPrevBtnPage}
          handlePageBtn={handlePageBtn}
          prevBtnActive={prevBtnActive}
          nextBtnActive={nextBtnActive}
          currentPage={currentPage}
        />
      </MainContentBottom>
      {isUserInfoDetail ? (
        <MainContentDetail>
          <UserInfoDetail
            item={userInfoDetailData}
            handleIsUserInfoDetailClose={handleIsUserInfoDetailClose}
            handleUpdateUserInfo={handleUpdateUserInfo}
          />
        </MainContentDetail>
      ) : (
        <></>
      )}
    </MainContent>
  );
});
export default UserInfoList;
