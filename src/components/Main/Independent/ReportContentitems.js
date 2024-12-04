import ReportContentItem from "./ReportContentItem";

const ReportContentitems = ({
  datas,
  handleContentCheckBox,
  handleToggleReportDetail,
}) => {
  return datas.map((item, index) => (
    <ReportContentItem
      key={index}
      item={item}
      index={index}
      handleContentCheckBox={handleContentCheckBox}
      handleToggleReportDetail={handleToggleReportDetail}
    />
  ));
};

export default ReportContentitems;
