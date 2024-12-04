import { useState } from "react";
import MainContentLeft from "../../../wrapper/Main/MainContentLeft";
import MainContentRight from "../../../wrapper/Main/MainContentRight";
import MainContentTitle from "../../../wrapper/MainContnetTitle";
import CheckInput from "../Common/CheckInput";
import ContentTitleItems, {
  contentTitleNames,
} from "../Common/ContentTitleItems";
import DeleteBtn from "../Common/DeleteBtn";

const ReportManagementTitle = ({
  isChecked,
  handleTitleCheckBox,
  handleDeleteReport,
}) => {
  const handleCheckboxChange = (check) => {
    handleTitleCheckBox(check);
  };

  return (
    <MainContentTitle>
      <MainContentLeft>
        <CheckInput isChecked={isChecked} onChange={handleCheckboxChange} />
        <ContentTitleItems leftTitleName={contentTitleNames.report} />
      </MainContentLeft>
      <MainContentRight>
        <DeleteBtn handleDelete={handleDeleteReport} />
      </MainContentRight>
    </MainContentTitle>
  );
};

export default ReportManagementTitle;
