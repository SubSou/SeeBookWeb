import { useState } from "react";
import MainContentLeft from "../../../wrapper/Main/MainContentLeft";
import MainContentRight from "../../../wrapper/Main/MainContentRight";
import MainContentTitle from "../../../wrapper/MainContnetTitle";
import CheckInput from "../Common/CheckInput";
import ContentTitleItems, {
  contentTitleNames,
} from "../Common/ContentTitleItems";
import DeleteBtn from "../Common/DeleteBtn";

const EventManagementTitle = ({ handleTitleCheckBox }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (check) => {
    setIsChecked(check);
    handleTitleCheckBox(check);
  };

  return (
    <MainContentTitle>
      <MainContentLeft>
        <CheckInput isChecked={isChecked} onChange={handleCheckboxChange} />
        <ContentTitleItems leftTitleName={contentTitleNames.event} />
      </MainContentLeft>
      <MainContentRight>
        <DeleteBtn />
      </MainContentRight>
    </MainContentTitle>
  );
};

export default EventManagementTitle;
