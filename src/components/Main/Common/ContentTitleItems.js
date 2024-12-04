import ContentTitleItem from "./ContentTitleItem";

export const contentTitleNames = {
  userInfo: "userinfo",
  review: "review",
  event: "event",
  customer: "customer",
  report: "report",
};

const leftTitleData = {
  userinfo: [
    {
      label: "이메일",
      styleValue: "email",
    },
    { label: "이름", styleValue: "name" },
    {
      label: "닉네임",
      styleValue: "nickname",
    },
    {
      label: "성별",
      styleValue: "gender",
    },
    {
      label: "등급",
      styleValue: "step",
    },
    {
      label: "가입날짜",
      styleValue: "date",
    },
  ],
  event: [
    { label: "", styleValue: "img" },
    {
      label: "제목",
      styleValue: "title",
    },
    {
      label: "이벤트 내용",
      styleValue: "content",
    },
    {
      label: "이벤트 기간",
      styleValue: "date",
    },
    {
      label: "활성화",
      styleValue: "active",
    },
  ],
  customer: [
    { label: "이메일", styleValue: "email" },
    { label: "이름", styleValue: "name" },
    { label: "닉네임", styleValue: "nickname" },
    { label: "문의유형", styleValue: "kind" },
    { label: "문의시간", styleValue: "time" },
    { label: "처리유무", styleValue: "process" },
  ],
  report: [
    { label: "신고자", styleValue: "my" },
    { label: "피신고자", styleValue: "you" },
    { label: "신고종류", styleValue: "kind" },
    { label: "신고시간", styleValue: "time" },
    { label: "처리유무", styleValue: "process" },
  ],
};

const ContentTitleItems = ({ leftTitleName }) => {
  const formatData = leftTitleData[leftTitleName];

  return (
    <div className="content-left-title ">
      {formatData.map((item, index) => (
        <ContentTitleItem
          key={index}
          label={item.label}
          styleValue={item.styleValue}
          leftTitleName={leftTitleName}
          index={index}
        />
      ))}
    </div>
  );
};
export default ContentTitleItems;
