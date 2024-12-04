import HeaderWrap from "../../components/Main/Independent/HeaderWrap";
import MainWrap from "../../components/Main/Independent/MainWrap";
import "../../css/Main/main.css";
import MainContainer from "../../wrapper/Main/MainContainer";

const Main = () => {
  return (
    <div className="main">
      <MainContainer>
        <HeaderWrap />
        <MainWrap />
      </MainContainer>
    </div>
  );
};

export default Main;
