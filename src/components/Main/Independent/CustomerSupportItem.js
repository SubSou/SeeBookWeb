import { useState } from "react";
import CheckInput from "../Common/CheckInput";
import MainContentLeft from "../../../wrapper/Main/MainContentLeft";
import MainContentRight from "../../../wrapper/Main/MainContentRight";
import MainContentBtn from "../Common/MainContentBtn";

const CustomerSupportItem = ({
  item,
  index,
  handleContentCheckBox,
  handleToggleSupportDetail,
}) => {
  const handleCheckboxChange = (check) => {
    handleContentCheckBox(check, item.supportId);
  };

  const handleFunc = () => {
    handleToggleSupportDetail(item.supportId);
  };

  return (
    <div key={index} className="main-content-list-item">
      <MainContentLeft>
        <CheckInput
          isChecked={item.isChecked}
          onChange={handleCheckboxChange}
        />
        <div
          className="customer-left-email left-content-font"
          style={{ marginLeft: "50px" }}
        >
          {item.email}
        </div>
        <div className="customer-left-name left-content-font">{item.name}</div>
        <div className="customer-left-nickname left-content-font">
          {item.nickname}
        </div>
        <div className="customer-left-kind left-content-font">
          {item.supportType}
        </div>
        <div className="customer-left-time left-content-font">
          {item.requestDate}
        </div>
        <div className="customer-left-process left-content-font">
          {item.processed ? "답변완료" : "처리중"}
        </div>
      </MainContentLeft>
      <MainContentRight>
        <MainContentBtn title={"자세히 보기"} handleFunc={handleFunc} />
      </MainContentRight>
    </div>
  );
};

export default CustomerSupportItem;
