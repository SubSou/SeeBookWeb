const MainContentDetail = ({
  children,
  paddingHor = "515px",
  paddingVer = "10px",
}) => {
  return (
    <div
      style={{
        paddingLeft: paddingHor,
        paddingRight: paddingHor,
        paddingBottom: paddingVer,
        paddingTop: paddingVer,
      }}
      className="main-content-detail"
    >
      {children}
      <div className="detail-black"></div>
    </div>
  );
};

export default MainContentDetail;
