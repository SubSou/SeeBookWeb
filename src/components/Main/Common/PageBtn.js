import { DARKGRAY, NEARGRAY, SELECTBLACK } from "../../../color/color";
import PageCenterBtn from "../Independent/PageCenterBtn";
import PageLeftBtn from "../Independent/PageLeftBtn";
import PageRightBtn from "../Independent/PageRightBtn";

const PageBtn = ({
  pageData,
  handelNextBtnPage,
  handelPrevBtnPage,
  handlePageBtn,
  prevBtnActive,
  nextBtnActive,
  currentPage,
}) => {
  return (
    <div className="page-btn">
      <PageLeftBtn
        prevBtnActive={prevBtnActive}
        handelPrevBtnPage={handelPrevBtnPage}
      />
      <PageCenterBtn
        pageData={pageData}
        currentPage={currentPage}
        handlePageBtn={handlePageBtn}
      />
      <PageRightBtn handelNextBtnPage={handelNextBtnPage} />
    </div>
  );
};

export default PageBtn;
