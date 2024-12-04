import { useMainContext } from "../../../contexts/MainContext";

const SearchInput = () => {
  const { searchText, handleSearchText } = useMainContext();

  const onTextChange = (event) => {
    handleSearchText(event.target.value);
  };

  return (
    <div className="search-input">
      <input value={searchText} onChange={onTextChange} type="text" />
    </div>
  );
};

export default SearchInput;
