const ContentTitleItem = ({ label, styleValue, leftTitleName, index }) => {
  return (
    <div
      key={index}
      className={`${leftTitleName}-left-${styleValue} left-title-font`}
    >
      {label}
    </div>
  );
};

export default ContentTitleItem;
