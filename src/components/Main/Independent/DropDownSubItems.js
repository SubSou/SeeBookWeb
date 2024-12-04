import { useMainContext } from "../../../contexts/MainContext";
import DropDownItem from "./DropDownSubItem";

const DropDownSubItems = ({ dropSubItems, handleDrop }) => {
  return dropSubItems.map((item, index) => (
    <DropDownItem
      key={index}
      item={item}
      index={index}
      handleDrop={handleDrop}
    />
  ));
};

export default DropDownSubItems;
