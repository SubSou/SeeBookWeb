import { useEffect, useState } from "react";
import { contentTitleNames } from "../../components/Main/Common/ContentTitleItems";
import CustomerSupprotTitle from "../../components/Main/Independent/CustomerSupprotTitle";
import { subDropDowmLists } from "../../components/Main/Independent/HeaderTitleItems";
import { useMainContext } from "../../contexts/MainContext";
import MainContent from "../../wrapper/MainContent";
import MainContentTop from "../../wrapper/Main/MainContentTop";
import MainContentList from "../../wrapper/Main/MainContentList";
import MainContentBottom from "../../wrapper/Main/MainContentBottom";
import PageBtnWrap from "../../components/Main/Independent/PageBtnWrap";
import Cookies from "js-cookie";
import {
  requestMainCustomerLists,
  requestMainDeleteSupport,
  requestMainSupportDetail,
  requestMainSupportProcess,
} from "../../api/Main/Api";
import CustomerSupportItems from "../../components/Main/Independent/CustomerSupportItems";
import MainContentDetail from "../../wrapper/Main/MainContentDetail";
import CustomerSupportDetail from "../../components/Main/Independent/CustomerSupportDetail";
import { useUserContext } from "../../contexts/UserContext";
import MainNonItem from "../../components/Main/Common/MainNonItem";

const pageNum = 3; // 페이지가 보여질 갯수
const pageItem = 5; // 현재 리뷰 아이템이 보여질 갯수

const CustomerSupport = () => {
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
  const [endPage, setEndPage] = useState(null);
  const [customerDatas, setCusomerDatas] = useState([]);

  const [supportDetailData, setSupportDetailData] = useState(null);
  const [isSupportDetail, setIsSupportDetail] = useState(false);

  const [pageData, setPageData] = useState([]);
  const [prevBtnActive, setPrevBtnActivie] = useState(false); // 이전 버튼 활성화 토글
  const [nextBtnActive, setNextBtnActivie] = useState(false); // 다음 버튼 활성화 토글

  const [currentPage, setCurrentpage] = useState(1);

  const [isChecked, setIsChecked] = useState(false); // 전체 선택하는 체크박스

  const initFormat = () => {
    setActiveIndex(4);
    setDropSubItems(subDropDowmLists[contentTitleNames.customer]);
  };

  useEffect(() => {
    initFormat();

    const fetchData = async () => {
      try {
        const { statusData, ...responseData } = await requestMainCustomerLists(
          token,
          1,
          "all",
          "all"
        );

        // Add isChecked: false to each user object
        const updatedUsers = responseData.data.support.map((user) => ({
          ...user,
          isChecked: false,
        }));

        if (responseData.data.totalSupportCount % 5 === 0) {
          setEndPage(responseData.data.endPage - 1);
        } else {
          setEndPage(responseData.data.endPage);
        }

        setCusomerDatas(updatedUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (supportDetailData !== null) {
      setIsSupportDetail(true);
    }
  }, [supportDetailData]);

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

          const { statusData, ...responseData } =
            await requestMainCustomerLists(
              token,
              1,
              title.value,
              formatSearchData
            );

          // Add isChecked: false to each user object
          const updatedUsers = responseData.data.support.map((user) => ({
            ...user,
            isChecked: false,
          }));
          if (responseData.data.totalSupportCount % 5 === 0) {
            setEndPage(responseData.data.endPage - 1);
          } else {
            setEndPage(responseData.data.endPage);
          }

          setCusomerDatas(updatedUsers);
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

      const { statusData, ...responseData } = await requestMainCustomerLists(
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
    console.log(pageNumer);
    try {
      const token = Cookies.get("token");
      let formatSearchData = searchText === "" ? "all" : searchText;

      const { statusData, ...responseData } = await requestMainCustomerLists(
        token,
        pageNumer,
        title.value,
        formatSearchData
      );

      setIsChecked(false);
      setIsClick(false);
      setCusomerDatas(responseData.data.support);
      setEndPage(responseData.data.endPage);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageBtn = async (papgeNumber) => {
    setCurrentpage(papgeNumber);
    handlePageBtnSelect(papgeNumber);
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
      setIsChecked(false);
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
      setIsChecked(false);
    } else {
      alert("마지막 페이지 입니다.");
    }
  };

  const handleTitleCheckBox = (isTitleChecked) => {
    setIsChecked(isTitleChecked);
    setCusomerDatas((prevData) => {
      return prevData.map((user) => ({
        ...user,
        isChecked: isTitleChecked,
      }));
    });
  };

  const handleContentCheckBox = (check, supportId) => {
    setCusomerDatas((prevData) =>
      prevData.map((user) =>
        user.supportId === supportId ? { ...user, isChecked: check } : user
      )
    );
  };

  const handleToggleSupportDetail = async (userId) => {
    const { statusData, ...responseData } = await requestMainSupportDetail(
      token,
      userId
    );

    if (statusData === 200) {
      setSupportDetailData(responseData.data);
    } else if (statusData === 400) {
      alert("존재하지 고객 목록 입니다.");
    } else if (statusData === 401) {
      handleTokenExpiry();
    } else {
      handleSystemError();
    }
  };

  const handleCloseDetail = () => {
    setIsSupportDetail(false);
  };

  if (customerDatas === null) {
    return <div></div>;
  }

  const handleSupportProcess = async (supportId, replyContent) => {
    const statusData = await requestMainSupportProcess(
      token,
      supportId,
      replyContent
    );
    return statusData;
  };

  const handleUpdateSupport = async (supportId, replyContent) => {
    if (window.confirm("답변을 완료하시겠습니까?")) {
      const statusData = await handleSupportProcess(supportId, replyContent);

      if (statusData === 200) {
        alert("성공적으로 완료 했습니다.");
        setCusomerDatas((prevData) =>
          prevData.map(
            (user) =>
              user.supportId === supportId
                ? {
                    ...user,
                    process: "답변 완료",
                  } // 기존 속성 유지
                : user // 나머지 사용자는 그대로 유지
          )
        );
        setIsSupportDetail(false);
      } else if (statusData === 400) {
        alert("존재하지 않는 문의 입니다.");
      } else if (statusData === 401) {
        handleTokenExpiry();
      } else {
        handleSystemError();
      }
    }
  };
  const handleAfterDeleteReport = async (supportIds) => {
    if (parseInt(supportIds.length) - parseInt(customerDatas.length) === 0) {
      if (currentPage - 1 === 0) {
        setCusomerDatas([]);
      } else {
        const responseData = await handleSupportLists(currentPage - 1);
        setCurrentpage(currentPage - 1);
        // Add isChecked: false to each user object
        const updatedUsers = responseData.data.support.map((user) => ({
          ...user,
          isChecked: false,
        }));
        setIsChecked(false);
        setIsClick(false);
        setCusomerDatas(updatedUsers);
        if (responseData.data.totalSupportCount % 5 === 0) {
          setEndPage(responseData.data.endPage - 1);
        } else {
          setEndPage(responseData.data.endPage);
        }
      }
    } else {
      const filteredReportDatas = customerDatas?.filter(
        (data) => !supportIds.includes(data.supportId)
      );

      setCusomerDatas(filteredReportDatas);
    }
    alert("삭제가 완료 되었습니다.");
  };

  const handleDeleteSupport = async () => {
    const supportIds = customerDatas
      ?.filter((data) => data.isChecked) // isChecked가 true인 항목만 필터링
      .map((data) => data.supportId); // 해당 항목의 reportId만 추출
    if (
      window.confirm(
        `${supportIds.length}개의 이벤트를 정말로 삭제하시겠습니까?`
      )
    ) {
      const statusData = await requestMainDeleteSupport(token, supportIds);
      if (statusData === 200) {
        await handleAfterDeleteReport(supportIds);
      } else {
      }
    }
  };

  if (customerDatas.length < 1) {
    return <MainNonItem title={"신청된 고객 문의가 없습니다."} />;
  }

  return (
    <MainContent>
      <MainContentTop>
        <CustomerSupprotTitle
          isChecked={isChecked}
          handleTitleCheckBox={handleTitleCheckBox}
          handleDeleteSupport={handleDeleteSupport}
        />
        <MainContentList>
          <CustomerSupportItems
            datas={customerDatas}
            handleContentCheckBox={handleContentCheckBox}
            handleToggleSupportDetail={handleToggleSupportDetail}
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
      {isSupportDetail ? (
        <MainContentDetail>
          <CustomerSupportDetail
            item={supportDetailData.support}
            handleCloseDetail={handleCloseDetail}
            handleUpdateSupport={handleUpdateSupport}
          />
        </MainContentDetail>
      ) : (
        <></>
      )}
    </MainContent>
  );
};

export default CustomerSupport;
