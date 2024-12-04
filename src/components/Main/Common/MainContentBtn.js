const MainContentBtn = ({
  title,
  handleFunc,
  btnClass = "main-content-btn",
}) => {
  return (
    <div onClick={handleFunc} className={btnClass}>
      {title}
    </div>
  );
};

export default MainContentBtn;
