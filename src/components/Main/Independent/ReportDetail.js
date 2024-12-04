import { useState } from "react";
import UserInfoDetailImg from "./UserInfoDetailImg";
import UserInfoDetailTitle from "./UserInfoDetailTitle";
import UserInfoTitle from "./UserInfoTitle";
import MainContentBtn from "../Common/MainContentBtn";
import DetailResetBtn from "../Common/DetailResetBtn";

const ReportDetail = ({
  item,
  handleCloseDetail,
  handleReportDetailProcess,
}) => {
  console.log(item);
  const [restLists, setResetLists] = useState({
    profile: false,
    nickname: false,
    review: false,
  });

  const [isDropDown, setIsDropDown] = useState(false);
  const [dropTitle, setDropTitle] = useState({
    label: "정지 기간을 선택해 주세요.",
    value: 0,
  });

  const handleDropDown = () => {
    console.log(!isDropDown);
    setIsDropDown(!isDropDown);
  };

  const handleResetProfile = () => {
    setResetLists({
      ...restLists,
      profile: !restLists.profile,
    });
  };

  const handleResetNickName = () => {
    setResetLists({
      ...restLists,
      nickname: !restLists.nickname,
    });
  };

  const handleResetReview = () => {
    setResetLists({
      ...restLists,
      review: !restLists.review,
    });
  };

  const hadleReport = async () => {
    await handleReportDetailProcess(
      item.reportId,
      item.reportedId,
      item.reviewId,
      item.reportType,
      dropTitle.value,
      restLists.profile,
      restLists.nickname,
      restLists.review
    );
  };
  return (
    <div className="report-detail">
      <div className="userinfo-detail-top">
        <UserInfoDetailTitle title={"신고처리"} />
        <UserInfoDetailImg
          imgurl={item.profileIamge}
          isRest={restLists.profile}
          handleFunc={handleResetProfile}
        />
        <div className="report-content-box">
          <div className="report-content">
            <div className="darkgray-18px">신&nbsp;&nbsp;고&nbsp;&nbsp;자</div>
            <div className="nearblack-18px">{item.reporterNickname}</div>
          </div>
          <div className="report-content">
            <div className="darkgray-18px">신고 종류</div>
            <div className="nearblack-18px">{item.reportType}</div>
          </div>
          <div className="report-content">
            <div className="darkgray-18px">신고 시간</div>
            <div className="nearblack-18px">{item.reportDate}</div>
          </div>
          <div className="report-content">
            <div className="darkgray-18px">신고 사유</div>
            <div className="nearblack-18px">{item.description}</div>
          </div>
          <div className="report-content">
            <div className="darkgray-18px">피 신고자</div>
            <div className="nearblack-18px">{item.reportedNickname}</div>
            <DetailResetBtn
              isRest={restLists.nickname}
              title={"닉네임 초기화"}
              handleFunc={handleResetNickName}
            />
          </div>
          <div className="report-content">
            <div className="darkgray-18px">리뷰 내용</div>
            <div className="nearblack-18px">{item.content}</div>
            <DetailResetBtn
              isRest={restLists.review}
              title={"리뷰 삭제"}
              handleFunc={handleResetReview}
            />
          </div>
        </div>
        <div className="report-date-title">
          <div className="darkgray-18px">정지 기간</div>
          <div className="report-drop-down">
            <div
              style={{ height: isDropDown ? 120 : 40 }}
              className="report-sub-drop-down"
            >
              <div onClick={handleDropDown} className="report-drop-title">
                <div>{dropTitle.label}</div>
                <div className="dropdown-main-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fillRule="currentColor"
                    className="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                </div>
              </div>
              <div
                onClick={() => {
                  setDropTitle({ label: "30일", value: 30 });
                  handleDropDown();
                }}
              >
                <div>30일</div>
              </div>
              <div
                onClick={() => {
                  setDropTitle({ label: "영구정지", value: 9999 });
                  handleDropDown();
                }}
              >
                <div>영구정지</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="userinfo-detail-bottom">
        <MainContentBtn title={"확인"} handleFunc={hadleReport} />
        <MainContentBtn
          title={"취소"}
          btnClass="gray-btn"
          handleFunc={handleCloseDetail}
        />
      </div>
    </div>
  );
};

export default ReportDetail;
