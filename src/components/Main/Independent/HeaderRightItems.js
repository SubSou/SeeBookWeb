import HeaderDropDown from "./HeaderDropDown";
import HeaderLogout from "./HeaderLogout";
import HeaderSearch from "./HeaderSearch";

const HeaderRightItems = () => {
  return (
    <div className="header-right-item-box">
      <HeaderDropDown />
      <HeaderSearch />
      <HeaderLogout />
    </div>
  );
};

export default HeaderRightItems;
