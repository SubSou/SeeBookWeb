import { NEARGRAY, SELECTBLACK } from "../../../color/color";

const PageCenterBtn = ({ pageData, currentPage, handlePageBtn }) => {
  return (
    <div className="page-center-btn-box">
      {pageData.map((item, index) => {
        return (
          <div
            className="page-center-btn"
            style={{
              color: currentPage === item ? SELECTBLACK : NEARGRAY,
            }}
            key={index}
            onClick={() => handlePageBtn(item)}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default PageCenterBtn;
