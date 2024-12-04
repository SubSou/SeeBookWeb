import { useState } from "react";
import CheckInput from "../Common/CheckInput";
import MainContentLeft from "../../../wrapper/Main/MainContentLeft";
import MainContentRight from "../../../wrapper/Main/MainContentRight";
import MainContentBtn from "../Common/MainContentBtn";

const UserInfoContentItem = ({
  item,
  index,
  handleContentCheckBox,
  handleToggleUserInfoDetail,
}) => {
  const [isChecked, setIsChecked] = useState(item.isChecked);

  const handleCheckboxChange = (check) => {
    handleContentCheckBox(check, item.userId);
  };

  const handleFunc = () => {
    handleToggleUserInfoDetail(item.userId);
  };

  return (
    <div key={index} className="main-content-list-item">
      <MainContentLeft>
        <CheckInput
          isChecked={item.isChecked}
          onChange={handleCheckboxChange}
        />
        <div
          className="userinfo-left-email left-content-font"
          style={{ marginLeft: "50px" }}
        >
          {item.email}
        </div>
        <div className="userinfo-left-name left-content-font">{item.name}</div>
        <div className="userinfo-left-nickname left-content-font">
          {item.nickname}
        </div>
        <div className="userinfo-left-gender left-content-font">
          {item.gender}
        </div>
        <div className="userinfo-left-step left-content-font">{item.role}</div>
        <div className="userinfo-left-date left-content-font">
          {item.createdDate}
        </div>
      </MainContentLeft>
      <MainContentRight>
        <MainContentBtn title={"정보 수정"} handleFunc={handleFunc} />
      </MainContentRight>
    </div>
  );
};

export default UserInfoContentItem;
