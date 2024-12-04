import { useState } from "react";
import { useMainContext } from "../../../contexts/MainContext";
import DropDownSubItems from "./DropDownSubItems";
import DropDownTitleItem from "./DropDownTitleItem";

const DropDonwItems = ({ dummyData }) => {
  const { isDrop, setIsDrop, title, setTitle, dropSubItems } = useMainContext();

  const handleDrop = (item) => {
    if (item) {
      setTitle({ ...item });
    }
    setIsDrop(!isDrop);
  };

  const minHeight = 45;
  const maxHeight = minHeight + 52 * dropSubItems.length;

  return (
    <div style={{ height: 45 }} className="dropdown">
      <div
        style={{ height: isDrop ? maxHeight : minHeight }}
        className="dropdown-main"
      >
        <DropDownTitleItem title={title} handleDrop={handleDrop} />
        <DropDownSubItems dropSubItems={dropSubItems} handleDrop={handleDrop} />
      </div>
    </div>
  );
};

export default DropDonwItems;
