import { useEffect, useState } from "react";
import { contentTitleNames } from "../../components/Main/Common/ContentTitleItems";
import { subDropDowmLists } from "../../components/Main/Independent/HeaderTitleItems";
import { useMainContext } from "../../contexts/MainContext";
import MainContent from "../../wrapper/MainContent";
import MainContentTop from "../../wrapper/Main/MainContentTop";
import MainContentBottom from "../../wrapper/Main/MainContentBottom";
import ReViewManageWrapper from "../../components/Main/Independent/ReViewManageWrapper";
import ReviewHeaderTitle from "../../components/Main/Independent/ReviewHeaderTitle";
import {
  requestMainReviewDelete,
  requestMainReviewLists,
} from "../../api/Main/Api";
import Cookies from "js-cookie";
import ReviewMainContent from "../../components/Main/Independent/ReviewMainContent";
import PageBtnWrap from "../../components/Main/Independent/PageBtnWrap";
import { useUserContext } from "../../contexts/UserContext";
import MainNonItem from "../../components/Main/Common/MainNonItem";

const pageNum = 3; // 페이지가 보여질 갯수
const pageItem = 4; // 현재 리뷰 아이템이 보여질 갯수

const ReviewManagement = () => {
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

  const [reviewDatas, setReviewDatas] = useState(null);
  const [endPage, setEndPage] = useState(null);

  const [pageData, setPageData] = useState([]);
  const [prevBtnActive, setPrevBtnActivie] = useState(false); // 이전 버튼 활성화 토글
  const [nextBtnActive, setNextBtnActivie] = useState(false); // 다음 버튼 활성화 토글

  const [currentPage, setCurrentpage] = useState(1);

  const initFormat = () => {
    setDropSubItems(subDropDowmLists[contentTitleNames.review]);
    setActiveIndex(1);
  };

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
        const { statusData, ...responseData } = await requestMainReviewLists(
          token,
          1,
          "all",
          "all"
        );
        console.log(responseData);

        if (responseData.data.totalReviewCount % pageItem === 0) {
          setEndPage(responseData.data.endPage - 1);
        } else {
          setEndPage(responseData.data.endPage);
        }

        setReviewDatas(responseData.data.review);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleReviewLists = async (currentPage) => {
    try {
      const token = Cookies.get("token");
      let formatSearchData = searchText === "" ? "all" : searchText;

      const { statusData, ...responseData } = await requestMainReviewLists(
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

  useEffect(() => {
    if (isClick) {
      const handleSearch = async () => {
        try {
          let formatSearchData = searchText === "" ? "all" : searchText;

          const { statusData, ...responseData } = await requestMainReviewLists(
            token,
            1,
            title.value,
            formatSearchData
          );

          setReviewDatas(responseData.data.review);

          if (responseData.data.totalReviewCount % pageItem === 0) {
            setEndPage(responseData.data.endPage - 1);
          } else {
            setEndPage(responseData.data.endPage);
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

  const handlePageBtnSelect = async (pageNumer) => {
    try {
      const token = Cookies.get("token");
      let formatSearchData = searchText === "" ? "all" : searchText;

      const { statusData, ...responseData } = await requestMainReviewLists(
        token,
        pageNumer,
        title.value,
        formatSearchData
      );

      setIsClick(false);
      setReviewDatas(responseData.data.review);

      if (responseData.data.totalReviewCount % pageItem === 0) {
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

  const handleAfterDeleteReview = async (reviewId) => {
    if (parseInt(reviewDatas.length) - 1 === 0) {
      if (currentPage - 1 === 0) {
        setReviewDatas([]);
      } else {
        const responseData = await handleReviewLists(currentPage - 1);
        setCurrentpage(currentPage - 1);

        setIsClick(false);
        setReviewDatas(responseData.data.review);
        if (responseData.data.totalReviewCount % 5 === 0) {
          setEndPage(responseData.data.endPage - 1);
        } else {
          setEndPage(responseData.data.endPage);
        }
      }
    } else {
      const filteredReviewDatas = reviewDatas?.filter(
        (data) => data.reviewId !== reviewId
      );

      setReviewDatas(filteredReviewDatas);
    }
    alert("삭제가 완료 되었습니다.");
  };

  const handleReviewDelete = async (reviewId) => {
    if (window.confirm(`해당 리뷰를 삭제하시겠습니까?`)) {
      const statusData = await requestMainReviewDelete(token, reviewId);
      if (statusData === 200) {
        await handleAfterDeleteReview(reviewId);
      } else if (statusData === 401) {
        handleTokenExpiry();
      } else {
        handleSystemError();
      }
    }
  };

  if (reviewDatas === null) {
    return <div></div>;
  }

  return reviewDatas.length < 1 ? (
    <MainNonItem title={"현재 작성된 리뷰가 없습니다"} />
  ) : (
    <MainContent>
      <MainContentTop>
        <ReViewManageWrapper>
          <ReviewHeaderTitle item={reviewDatas} />
          <ReviewMainContent
            item={reviewDatas}
            handleReviewDelete={handleReviewDelete}
          />
        </ReViewManageWrapper>
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
    </MainContent>
  );
};

export default ReviewManagement;
