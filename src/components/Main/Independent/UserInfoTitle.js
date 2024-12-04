import { useEffect, useState } from "react";
import CheckInput from "../Common/CheckInput";

import DeleteBtn from "../Common/DeleteBtn";
import MainContentTitle from "../../../wrapper/MainContnetTitle";

import ContentTitleItems, {
  contentTitleNames,
} from "../Common/ContentTitleItems";
import MainContentLeft from "../../../wrapper/Main/MainContentLeft";
import MainContentRight from "./../../../wrapper/Main/MainContentRight";

const UserInfoTitle = ({
  isChecked,
  handleTitleCheckBox,
  handleDeleteUser,
  handleMainLogout,
}) => {
  const handleCheckboxChange = (check) => {
    handleTitleCheckBox(check);
  };
  return (
    <MainContentTitle>
      <MainContentLeft>
        <CheckInput isChecked={isChecked} onChange={handleCheckboxChange} />
        <ContentTitleItems
          leftTitleName={contentTitleNames.userInfo}
          handleFunc={handleMainLogout}
        />
      </MainContentLeft>

      <MainContentRight>
        <DeleteBtn handleDelete={handleDeleteUser} />
      </MainContentRight>
    </MainContentTitle>
  );
};

export default UserInfoTitle;
