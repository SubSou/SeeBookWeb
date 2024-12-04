import { useEffect, useState } from "react";
import { contentTitleNames } from "../../components/Main/Common/ContentTitleItems";
import { subDropDowmLists } from "../../components/Main/Independent/HeaderTitleItems";
import ReportManagementTitle from "../../components/Main/Independent/ReportManagementTitle";
import { useMainContext } from "../../contexts/MainContext";
import MainContent from "../../wrapper/MainContent";
import MainContentTop from "../../wrapper/Main/MainContentTop";
import MainContentBottom from "../../wrapper/Main/MainContentBottom";
import {
  requestMainDeleteReport,
  requestMainReportDetail,
  requestMainReportLists,
  requestMainReportProcess,
} from "../../api/Main/Api";
import Cookies from "js-cookie";
import PageBtnWrap from "../../components/Main/Independent/PageBtnWrap";
import MainContentList from "../../wrapper/Main/MainContentList";
import ReportContentitems from "../../components/Main/Independent/ReportContentitems";
import MainContentDetail from "../../wrapper/Main/MainContentDetail";
import ReportDetail from "../../components/Main/Independent/ReportDetail";
import { useUserContext } from "../../contexts/UserContext";
import MainNonItem from "../../components/Main/Common/MainNonItem";

const pageNum = 3;

const ReportManagement = () => {
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
  const [pageData, setPageData] = useState([]);
  const [reportDatas, setReportDatas] = useState(null);

  const [prevBtnActive, setPrevBtnActivie] = useState(false); // 이전 버튼 활성화 토글
  const [nextBtnActive, setNextBtnActivie] = useState(false); // 다음 버튼 활성화 토글

  const [currentPage, setCurrentpage] = useState(1);
  const [endPage, setEndPage] = useState(null);

  const [isReportDetail, setIsReportDetail] = useState(false);
  const [reportDetail, setReportDetail] = useState(null);

  const [isChecked, setIsChecked] = useState(false); // 전체 선택하는 체크박스

  const initFormat = () => {
    setActiveIndex(2);
    setDropSubItems(subDropDowmLists[contentTitleNames.report]);
  };

  useEffect(() => {
    if (isReportDetail === true) {
      setIsReportDetail(false);
    }
  }, [reportDatas]);

  useEffect(() => {
    if (reportDetail !== null) {
      setIsReportDetail(true);
    }
  }, [reportDetail]);

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
    initFormat();

    const fetchData = async () => {
      try {
        const { statusData, ...responseData } = await requestMainReportLists(
          token,
          1,
          "all",
          "all"
        );

        // Add isChecked: false to each user object
        const updatedUsers = responseData.data.report.map((user) => ({
          ...user,
          isChecked: false,
        }));

        if (responseData.data.totalReportCount % 5 === 0) {
          setEndPage(responseData.data.endPage - 1);
        } else {
          setEndPage(responseData.data.endPage);
        }
        setReportDatas(updatedUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleMainReportLists = async (currentPage) => {
    let formatSearchData = searchText === "" ? "all" : searchText;
    const { statusData, ...responseData } = await requestMainReportLists(
      token,
      currentPage,
      title.value,
      formatSearchData
    );

    if (statusData === 200) {
      return responseData;
    } else if (statusData === 401) {
      handleTokenExpiry();
    } else {
      handleSystemError();
    }
  };

  const handlePageBtnSelect = async (pageNumer) => {
    try {
      const token = Cookies.get("token");
      let formatSearchData = searchText === "" ? "all" : searchText;

      const { statusData, ...responseData } = await requestMainReportLists(
        token,
        pageNumer,
        title.value,
        formatSearchData
      );

      // Add isChecked: false to each user object
      const updatedUsers = responseData.data.report.map((user) => ({
        ...user,
        isChecked: false,
      }));
      setIsChecked(false);
      setIsClick(false);
      setReportDatas(updatedUsers);
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

    setReportDatas((prevData) => {
      return prevData.map((user) => ({
        ...user,
        isChecked: isTitleChecked,
      }));
    });
  };

  const handleContentCheckBox = (check, reportId) => {
    setReportDatas((prevData) =>
      prevData.map((user) =>
        user.reportId === reportId ? { ...user, isChecked: check } : user
      )
    );
  };

  const handleToggleReportDetail = async (reportId) => {
    const { statusData, ...responseData } = await requestMainReportDetail(
      token,
      reportId
    );
    if (statusData === 200) {
      setReportDetail(responseData.data);
    } else if (statusData === 400) {
      alert("존재하지 않는 유저 입니다.");
    } else if (statusData === 401) {
      handleTokenExpiry();
    } else {
      handleSystemError();
    }
  };

  const handleCloseDetail = () => {
    setIsReportDetail(false);
  };

  const handleUpdateReportData = (reportId) => {
    setReportDatas((prevReportDatas) =>
      prevReportDatas.map((report) =>
        report.reportId === reportId
          ? { ...report, processed: !report.processed } // processed 값 반전
          : report
      )
    );
  };

  const handleReportDetailProcess = async (
    reportId,
    reportedId,
    reviewId,
    reportType,
    suspensionPeriod,
    resetProfileImage,
    resetNickname,
    deleteReview
  ) => {
    if (window.confirm("정말로 신고 처리 하시겠습니까?")) {
      const statusData = await requestMainReportProcess(
        token,
        reportId,
        reportedId,
        reviewId,
        reportType,
        suspensionPeriod,
        resetProfileImage,
        resetNickname,
        deleteReview
      );

      if (statusData === 200) {
        handleUpdateReportData(reportId);
      } else if (statusData === 400) {
        alert("존재하지 않는 신고 정보 입니다.");
      } else if (statusData === 401) {
        handleTokenExpiry();
      } else {
        handleSystemError();
      }
    }
  };

  const handleAfterDeleteReport = async (reportIds) => {
    console.log(reportIds);
    if (parseInt(reportIds.length) - parseInt(reportDatas.length) === 0) {
      if (currentPage - 1 === 0) {
        setReportDatas([]);
      } else {
        const responseData = await handleMainReportLists(currentPage - 1);
        setCurrentpage(currentPage - 1);
        // Add isChecked: false to each user object
        const updatedUsers = responseData.data.report.map((user) => ({
          ...user,
          isChecked: false,
        }));
        setIsChecked(false);
        setIsClick(false);
        setReportDatas(updatedUsers);
        if (responseData.data.totalReportCount % 5 === 0) {
          setEndPage(responseData.data.endPage - 1);
        } else {
          setEndPage(responseData.data.endPage);
        }
      }
    } else {
      const filteredReportDatas = reportDatas?.filter(
        (data) => !reportIds.includes(data.reportId)
      );
      console.log(filteredReportDatas);

      setReportDatas(filteredReportDatas);
    }
  };

  const handleDeleteReport = async () => {
    const reportIds = reportDatas
      ?.filter((data) => data.isChecked) // isChecked가 true인 항목만 필터링
      .map((data) => data.reportId); // 해당 항목의 reportId만 추출

    const statusData = await requestMainDeleteReport(token, reportIds);
    if (statusData === 200) {
      await handleAfterDeleteReport(reportIds);
    }
  };

  if (reportDatas === null) {
    return <div></div>;
  }

  if (reportDatas.length < 1) {
    return <MainNonItem title={"접수된 신고가 없습니다."} />;
  }

  return (
    <MainContent>
      <MainContentTop>
        <ReportManagementTitle
          isChecked={isChecked}
          handleTitleCheckBox={handleTitleCheckBox}
          handleDeleteReport={handleDeleteReport}
        />
        <MainContentList>
          <ReportContentitems
            datas={reportDatas}
            handleContentCheckBox={handleContentCheckBox}
            handleToggleReportDetail={handleToggleReportDetail}
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
      {isReportDetail ? (
        <MainContentDetail>
          <ReportDetail
            item={reportDetail}
            handleCloseDetail={handleCloseDetail}
            handleReportDetailProcess={handleReportDetailProcess}
          />
        </MainContentDetail>
      ) : (
        <></>
      )}
    </MainContent>
  );
};

export default ReportManagement;
