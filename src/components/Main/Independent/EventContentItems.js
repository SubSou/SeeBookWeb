import EventContentItem from "./EvnetContentItem";

const EventContentItems = ({ datas, handleContentCheckBox }) => {
  return datas.map((item, index) => (
    <EventContentItem
      key={index}
      item={item}
      index={index}
      handleContentCheckBox={handleContentCheckBox}
    />
  ));
};

export default EventContentItems;
