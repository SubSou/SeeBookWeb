const DetailResetBtn = ({ title, isRest, handleFunc }) => {
  return (
    <div
      onClick={handleFunc}
      className={`${
        isRest ? "reset-color" : "non-reset-color"
      } userinfo-detail-reset-btn`}
    >
      {title}
    </div>
  );
};

export default DetailResetBtn;
