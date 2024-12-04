import { LIGHTGRAY, MEDIUMGRAY, NEARWHITE, WHITE } from "../../../color/color";

const HeaderMenuItem = ({ menuItems, activeIndex, handleClick }) => {
  return menuItems.map((item, index) => (
    <div
      key={index}
      onClick={() => handleClick(index)}
      className={`title-text-box ${
        activeIndex === index ? "title-select-shadow" : ""
      }`}
      style={{
        cursor: "pointer",
        position: "relative", // position relative를 설정하여 자식 요소의 absolute가 이 div를 기준으로 하게 함
      }}
    >
      {/* 마지막 요소가 아닌 경우에만 hide-item을 추가 */}
      {/* {index !== menuItems.length - 1 && (
        <span className="title-hide-item" style={{ position: "absolute" }}>
          <span style={{ right: index === activeIndex ? -40 : -41 }}></span>
          {item.label}
        </span>
      )} */}
      <div
        className={`title-fill-bk-item ${
          activeIndex === index ? "title-select" : ""
        }`}
      ></div>

      <span className="title-show-item">
        {item.label}
        {index !== menuItems.length - 1 && (
          <span className="title-hide-item" style={{ position: "absolute" }}>
            <span
              style={{
                right:
                  // 클릭된 요소와 이전 요소만 -41, 나머지는 -40
                  index === activeIndex || index === activeIndex - 1
                    ? -41
                    : -40,
              }}
            ></span>
            {item.label}
          </span>
        )}
      </span>
    </div>
  ));
};

export default HeaderMenuItem;
