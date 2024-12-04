import { useState } from "react";
import CheckInput from "../Common/CheckInput";
import MainContentLeft from "../../../wrapper/Main/MainContentLeft";
import MainContentRight from "../../../wrapper/Main/MainContentRight";
import MainContentBtn from "../Common/MainContentBtn";

const ReportContentItem = ({
  item,
  index,
  handleContentCheckBox,
  handleToggleReportDetail,
}) => {
  const [isChecked, setIsChecked] = useState(item.isChecked);

  const handleCheckboxChange = (check) => {
    handleContentCheckBox(check, item.reportId);
  };

  const handleFunc = () => {
    handleToggleReportDetail(item.reportId);
  };

  return (
    <div key={index} className="main-content-list-item">
      <MainContentLeft>
        <CheckInput
          isChecked={item.isChecked}
          onChange={handleCheckboxChange}
        />
        <div
          className="report-left-my left-content-font"
          style={{ marginLeft: "50px" }}
        >
          {item.reporterNickname}
        </div>
        <div className="report-left-you left-content-font">
          {item.reportedNickname}
        </div>
        <div className="report-left-kind left-content-font">
          {item.reportType}
        </div>
        <div className="report-left-time left-content-font">
          {item.reportDate}
        </div>
        <div
          className={`report-left-process ${
            item.processed ? "non-report-process" : "left-content-font"
          }`}
        >
          {item.processed ? "처리 완료" : "처리 미완료"}
        </div>
      </MainContentLeft>
      <MainContentRight>
        <MainContentBtn title={"정보 수정"} handleFunc={handleFunc} />
      </MainContentRight>
    </div>
  );
};

export default ReportContentItem;
