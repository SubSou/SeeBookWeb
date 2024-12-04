const DropDownSubItem = ({ item, index, handleDrop }) => {
  const onChange = (item) => {
    handleDrop(item);
  };

  return (
    <div
      key={index}
      onClick={() => {
        onChange(item);
      }}
      className="dropdown-sub-item"
    >
      <div>{item.label}</div>
    </div>
  );
};

export default DropDownSubItem;
