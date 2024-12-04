import { DARKGRAY } from "../../../color/color";

const PageLeftBtn = ({ prevBtnActive, handelPrevBtnPage }) => {
  return (
    <div
      style={{
        opacity: prevBtnActive ? 1 : 0,
      }}
      className="page-left-btn"
      onClick={handelPrevBtnPage}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="20"
        fill="currentColor"
        className="bi bi-chevron-left"
        viewBox="0 0 16 16"
        style={{
          color: DARKGRAY,
        }}
      >
        <path
          fillRule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
        />
      </svg>
    </div>
  );
};

export default PageLeftBtn;
