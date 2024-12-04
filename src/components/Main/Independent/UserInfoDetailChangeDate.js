import { useState } from "react";
import MainContentDetail from "../../../wrapper/Main/MainContentDetail";
import MainContentBtn from "./../Common/MainContentBtn";

const UserInfoDetailChangeDate = ({
  date,

  closeChDate,
  updateChDate,
}) => {
  const [chDate, setChDate] = useState("정지 기간을 선택해 주세요.");

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해줌
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleChangeDate = (event) => {
    setChDate(formatDate(new Date(event.target.value)));
  };

  const handleUpdateChDate = () => {
    updateChDate(chDate);
  };

  return (
    <MainContentDetail>
      <div className="userinfo-detail-change-date">
        <div className="detail-chagne-top">
          <div className="detail-change-title">정지 기간 수정</div>
          <div className="detail-change-date">
            <div className="detail-chagne-end-title">종료 날짜</div>
            <input
              type="datetime-local"
              value={date}
              onChange={handleChangeDate}
            />
            <div className="detail-chagne-label">{chDate}</div>
          </div>
        </div>
        <div className="detail-change-bottom">
          <MainContentBtn title={"확인"} handleFunc={handleUpdateChDate} />
          <MainContentBtn
            title={"취소"}
            btnClass="gray-btn"
            handleFunc={closeChDate}
          />
        </div>
      </div>
    </MainContentDetail>
  );
};

export default UserInfoDetailChangeDate;
