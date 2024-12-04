import MainContentLeft from "../../../wrapper/Main/MainContentLeft";
import MainContentRight from "../../../wrapper/Main/MainContentRight";
import CheckInput from "../Common/CheckInput";
import MainContentBtn from "../Common/MainContentBtn";

const EventContentItem = ({ item, index, handleContentCheckBox }) => {
  const handleCheckboxChange = (check) => {
    handleContentCheckBox(check, item.userId);
  };

  const handleFunc = () => {};

  return (
    <div key={index} className="main-content-list-item">
      <MainContentLeft>
        <CheckInput
          isChecked={item.isChecked}
          onChange={handleCheckboxChange}
        />
        <div
          className="event-left-img  left-content-font"
          style={{ marginLeft: "50px" }}
        ></div>
        <div className="event-left-title  left-content-font">
          {item.content}
        </div>
        <div className="event-left-content left-content-font">
          {item.content}
        </div>
        <div className="event-left-date left-content-font">
          <div>{item.period.start}</div>
          <div>~{item.period.end}</div>
        </div>
        <div className="event-left-active left-content-font">{item.status}</div>
      </MainContentLeft>
      <MainContentRight>
        <MainContentBtn title={"정보 수정"} handleFunc={handleFunc} />
      </MainContentRight>
    </div>
  );
};
export default EventContentItem;
