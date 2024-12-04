const ChoiceItem = ({ leftTite, rightTitle, data, selectData, handeFunc }) => {
  const toggleClass = data[0].value === "MALE" ? "choice-padding" : "";
  console.log(selectData.value);

  return (
    <div className="userinfo-box">
      <div>
        {leftTite}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{rightTitle}
      </div>
      <div className={`${toggleClass} choice-detail-item`}>
        {data.map((item, index) => (
          <div
            onClick={() => {
              handeFunc(item);
            }}
            key={index}
            className={`${
              selectData.value === item.value ? "" : "choice-non-select"
            } `}
          >
            {item.label}
          </div>
        ))}
        <div className="choice-detail-bar"></div>
      </div>
    </div>
  );
};

export default ChoiceItem;
