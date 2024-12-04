import CustomerSupportItem from "./CustomerSupportItem";

const CustomerSupportItems = ({
  datas,
  handleContentCheckBox,
  handleToggleSupportDetail,
}) => {
  return datas.map((item, index) => (
    <CustomerSupportItem
      key={index}
      item={item}
      index={index}
      handleContentCheckBox={handleContentCheckBox}
      handleToggleSupportDetail={handleToggleSupportDetail}
    />
  ));
};

export default CustomerSupportItems;
