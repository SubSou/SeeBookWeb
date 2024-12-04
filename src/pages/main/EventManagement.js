import { useEffect, useState } from "react";
import { contentTitleNames } from "../../components/Main/Common/ContentTitleItems";
import EventManagementTitle from "../../components/Main/Independent/EventManagementTitle";
import { subDropDowmLists } from "../../components/Main/Independent/HeaderTitleItems";
import { useMainContext } from "../../contexts/MainContext";
import MainContent from "../../wrapper/MainContent";
import MainContentTop from "../../wrapper/Main/MainContentTop";
import MainContentBottom from "../../wrapper/Main/MainContentBottom";
import PageBtnWrap from "../../components/Main/Independent/PageBtnWrap";
import Cookies from "js-cookie";
import { requestMainEventLists } from "../../api/Main/Api";
import MainNonItem from "../../components/Main/Common/MainNonItem";
import MainContentList from "../../wrapper/Main/MainContentList";
import EventContentItems from "../../components/Main/Independent/EventContentItems";
import EventDetailBtn from "../../components/Main/Independent/EventDetailBtn";
import MainContentDetail from "../../wrapper/Main/MainContentDetail";

const pageNum = 3; // 페이지가 보여질 갯수
const pageItem = 4; // 현재 리뷰 아이템이 보여질 갯수

const EventManagement = () => {
  const token = Cookies.get("token");

  const {
    setDropSubItems,
    isClick,
    setIsClick,
    searchText,
    title,
    setActiveIndex,
  } = useMainContext();

  const [eventDatas, setEventDatas] = useState(null);

  const [endPage, setEndPage] = useState(null);

  const [pageData, setPageData] = useState([]);
  const [prevBtnActive, setPrevBtnActivie] = useState(false); // 이전 버튼 활성화 토글
  const [nextBtnActive, setNextBtnActivie] = useState(false); // 다음 버튼 활성화 토글

  const [currentPage, setCurrentpage] = useState(1);

  const [isEventDetail, setIsEventDetail] = useState(false);

  const initFormat = () => {
    setActiveIndex(3);
    setDropSubItems(subDropDowmLists[contentTitleNames.event]);
  };

  useEffect(() => {
    initFormat();
    // const fetchData = async () => {
    //   try {
    //     const { statusData, ...responseData } = await requestMainEventLists(
    //       token,
    //       1,
    //       "all",
    //       "all"
    //     );

    //     setEventDats(responseData.data.event);
    //     setTotalReviewCount(responseData.data.totalReviewCount / pageItem);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // fetchData();

    // 시작 날짜와 종료 날짜를 자동으로 생성
    const generateEventData = () => {
      const events = [];
      const baseStartDate = new Date("2024-01-01");

      for (let i = 1; i <= 5; i++) {
        const startDate = new Date(baseStartDate);
        startDate.setDate(baseStartDate.getDate() + (i - 1) * 15); // 15일 간격

        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 14); // 시작일 기준 14일 후 종료

        events.push({
          userId: i,
          image: process.env.PUBLIC_URL + "assets/Auth/SeeBookIcon.png", // public 폴더의 이미지 경로
          content: `Event ${i}`, // 이벤트 내용
          period: {
            start: startDate.toISOString().split("T")[0], // 날짜 포맷: YYYY-MM-DD
            end: endDate.toISOString().split("T")[0], // 종료 날짜
          },
          status: i % 2 === 0 ? "종료" : "진행중", // 짝수는 종료, 홀수는 진행 중
          isChecked: false,
        });
      }

      return events;
    };
    // 더미 데이터 설정
    setEventDatas(generateEventData());
    setEndPage(generateEventData().length / 5);
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

  const handlePageBtnSelect = async (pageNumer) => {
    try {
      const token = Cookies.get("token");
      let formatSearchData = searchText === "" ? "all" : searchText;

      const { statusData, ...responseData } = await requestMainEventLists(
        token,
        pageNumer,
        title.value,
        formatSearchData
      );

      setIsClick(false);
      setEventDatas(responseData.data.review);
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

  const handleTitleCheckBox = (isTitleChecked) => {
    setEventDatas((prevData) => {
      return prevData.map((user) => ({
        ...user,
        isChecked: isTitleChecked,
      }));
    });
  };

  const handleContentCheckBox = (check, userId) => {
    setEventDatas((prevData) =>
      prevData.map((user) =>
        user.userId === userId ? { ...user, isChecked: check } : user
      )
    );
  };

  if (eventDatas === null) {
    return <div></div>;
  }

  if (eventDatas.length < 1) {
    return <MainNonItem title={"현재 진행중인 이벤트가 없습니다."} />;
  }

  return (
    <MainContent>
      <MainContentTop>
        <EventManagementTitle handleTitleCheckBox={handleTitleCheckBox} />
        <MainContentList>
          <EventContentItems
            datas={eventDatas}
            handleContentCheckBox={handleContentCheckBox}
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
        <EventDetailBtn />
      </MainContentBottom>
      {isEventDetail ? <MainContentDetail></MainContentDetail> : <></>}
    </MainContent>
  );
};

export default EventManagement;
