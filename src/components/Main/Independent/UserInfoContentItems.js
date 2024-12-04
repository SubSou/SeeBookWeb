import UserInfoContentItem from "./UserInfoContentItem";

const UserInfoContentItems = ({
  datas,
  handleContentCheckBox,
  handleToggleUserInfoDetail,
}) => {
  return datas.map((item, index) => (
    <UserInfoContentItem
      key={index}
      item={item}
      index={index}
      handleContentCheckBox={handleContentCheckBox}
      handleToggleUserInfoDetail={handleToggleUserInfoDetail}
    />
  ));
};

export default UserInfoContentItems;
