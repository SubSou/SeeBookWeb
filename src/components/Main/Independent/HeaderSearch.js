import SearchIcon from "./SearchIcon";
import SearchInput from "./SearchInput";

const HeaderSearch = () => {
  return (
    <div className="search">
      <div className="search-main">
        <SearchInput />
        <SearchIcon />
      </div>
    </div>
  );
};

export default HeaderSearch;
