import { LIGHTGRAY, MEDIUMGRAY, REDCOLOR, WHITE } from "../../../color/color";

const DeleteBtn = ({ handleDelete }) => {
  return (
    <div onClick={handleDelete} className="right-title-btn">
      삭제
    </div>
  );
};

export default DeleteBtn;
