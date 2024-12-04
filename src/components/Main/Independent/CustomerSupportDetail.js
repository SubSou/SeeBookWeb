import { useState } from "react";
import MainContentBtn from "../Common/MainContentBtn";

const CustomerSupportDetail = ({
  item,
  handleCloseDetail,
  handleUpdateSupport,
}) => {
  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(item.replyContent ? true : false);
  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleFunc = () => {
    if (text.length < 1) {
      alert("답변을 작성해주세요");
    } else {
      console.log(item.supportId, text);
      handleUpdateSupport(item.supportId, text);
    }
  };

  return (
    <div className="support-detail">
      <div className="support-detail-main-top">
        <div className="black-24-px">문의 내용</div>
        <div className="support-detail-content-box">
          <div className="support-detail-content-top">
            <div className="support-detail-userinfo-box">
              <div className="support-detail-userinfo">
                <div className="darkgray-18px">
                  이&nbsp;&nbsp;메&nbsp;&nbsp;일
                </div>
                <div className="support-detail-userinfo-sub mediumgray-18px">
                  {item.email}
                </div>
              </div>
              <div className="support-detail-userinfo">
                <div className="darkgray-18px">
                  닉&nbsp;&nbsp;네&nbsp;&nbsp;임
                </div>
                <div className="support-detail-userinfo-sub mediumgray-18px">
                  {item.nickname}
                </div>
              </div>
              <div className="support-detail-userinfo">
                <div className="darkgray-18px">
                  이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름
                </div>
                <div className="support-detail-userinfo-sub mediumgray-18px">
                  {item.name}
                </div>
              </div>
            </div>

            <div className="support-detail-type-box">
              <div className="support-detail-type">
                <div className="darkgray-18px">문의 유형</div>
                <div className="mediumgray-18px">{item.supportType}</div>
              </div>
              <div className="support-detail-reqeust-date">
                <div className="darkgray-18px">문의 시간</div>
                <div className="mediumgray-18px">{item.requestDate}</div>
              </div>
            </div>
            <div className="support-detail-content">
              <div className="darkgray-18px">문의 내용</div>
              <div className="mediumgray-18px">{item.content}</div>
            </div>
          </div>
          <div className="support-detail-content-bottom">
            <div className="support-detail-answer">
              <div className="darkgray-18px">
                답&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;변
              </div>
              <div className="support-textarea-box">
                <textarea
                  disabled={disabled}
                  value={text}
                  onChange={handleText}
                  placeholder="  "
                />
                <label>
                  {disabled ? item.replyContent : "답변을 입력해주세요."}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="support-detail-main-bottom">
        <MainContentBtn title={"확인"} handleFunc={handleFunc} />
        <MainContentBtn
          title={"취소"}
          btnClass="gray-btn"
          handleFunc={handleCloseDetail}
        />
      </div>
    </div>
  );
};

export default CustomerSupportDetail;
