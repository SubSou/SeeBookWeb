import { useState } from "react";
import MainContentLeft from "../../../wrapper/Main/MainContentLeft";
import MainContentRight from "../../../wrapper/Main/MainContentRight";
import MainContentTitle from "../../../wrapper/MainContnetTitle";
import CheckInput from "../Common/CheckInput";
import ContentTitleItems, {
  contentTitleNames,
} from "../Common/ContentTitleItems";
import DeleteBtn from "../Common/DeleteBtn";

const CustomerSupprotTitle = ({
  isChecked,
  handleTitleCheckBox,
  handleDeleteSupport,
}) => {
  const handleCheckboxChange = (check) => {
    handleTitleCheckBox(check);
  };
  return (
    <MainContentTitle>
      <MainContentLeft>
        <CheckInput isChecked={isChecked} onChange={handleCheckboxChange} />
        <ContentTitleItems leftTitleName={contentTitleNames.customer} />
      </MainContentLeft>
      <MainContentRight>
        <DeleteBtn handleDelete={handleDeleteSupport} />
      </MainContentRight>
    </MainContentTitle>
  );
};

export default CustomerSupprotTitle;
