import "../../../css/Main/pageBtn.css";
import PageBtn from "../Common/PageBtn";

const PageBtnWrap = ({
  pageData,
  handelNextBtnPage,
  handelPrevBtnPage,
  handlePageBtn,
  prevBtnActive,
  nextBtnActive,
  currentPage,
}) => {
  return (
    <div className="page-btn-wrap">
      <PageBtn
        pageData={pageData}
        handelNextBtnPage={handelNextBtnPage}
        handelPrevBtnPage={handelPrevBtnPage}
        handlePageBtn={handlePageBtn}
        prevBtnActive={prevBtnActive}
        nextBtnActive={nextBtnActive}
        currentPage={currentPage}
      />
    </div>
  );
};

export default PageBtnWrap;
