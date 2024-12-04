import { useEffect, useState } from "react";
import UserInfoDetailTitle from "./UserInfoDetailTitle";
import UserInfoDetailImg from "./UserInfoDetailImg";
import UserInfoDetailEmail from "./UserInfoDetailEmail";
import UserInfoDetailNickNameBox from "./UserInfoDetailNickNameBox";
import UserInfoDetailName from "./UserInfoDetailName";
import UserInfoDetailSuspend from "./UserInfoDetailSuspend";
import ChoiceItem from "../Common/ChoiceItem";
import UserInfoDetailPassword from "./UserInfoDetailPassword";
import MainContentBtn from "../Common/MainContentBtn";
import {
  requestMainChangeUserInfo,
  requestMainUserNickNameValidation,
} from "../../../api/Main/Api";
import Cookies from "js-cookie";
import { useUserContext } from "../../../contexts/UserContext";
import UserInfoDetailChangeDate from "./UserInfoDetailChangeDate";

const UserInfoDetail = ({
  item,
  handleIsUserInfoDetailClose,
  handleUpdateUserInfo,
}) => {
  console.log(item);
  const { handleTokenExpiry, handleSystemError } = useUserContext();

  const token = Cookies.get("token");
  const prevNickName = item.nickname;
  const [nickName, setNickName] = useState(item.nickname);
  const [password, setPassword] = useState("");
  const [date, setDate] = useState(123);

  const [isChDate, setIsChDate] = useState(false);

  const [gender, setGender] = useState({
    label: item.gender === "MALE" ? "남자" : "여자",
    value: item.gender,
  });
  const [role, setRole] = useState({
    label: item.role === "관리자" ? "관리자" : "사용자",
    value: item.role === "관리자" ? "관리자" : "사용자",
  });
  const [isPassword, setIsPassword] = useState(false);

  const [restLists, setResetLists] = useState({
    profile: false,
    nickname: false,
    password: false,
    date: false,
  });

  const genderData = [
    { label: "남자", value: "MALE" },
    { label: "여자", value: "FEMALE" },
  ];

  const roleData = [
    { label: "관리자", value: "관리자" },
    { label: "사용자", vlaue: "사용자" },
  ];

  useEffect(() => {
    if (!restLists.nickname) {
      setNickName(prevNickName);
    }
  }, [restLists.nickname]);

  const handleNickName = (event) => {
    setNickName(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleGender = (value) => {
    console.log(value);
    setGender(value);
  };

  const handleRole = (value) => {
    setRole(value);
  };

  const handleResetProfile = () => {
    setResetLists({
      ...restLists,
      profile: !restLists.profile,
    });
  };

  const handleResetNickName = () => {
    setResetLists({
      ...restLists,
      nickname: !restLists.nickname,
    });
  };

  const handleResetPassword = () => {
    setResetLists({
      ...restLists,
      password: !restLists.password,
    });
  };

  const openChdate = () => {
    setIsChDate(true);
  };

  const closeChDate = () => {
    setIsChDate(false);
  };

  const updateChDate = (date) => {
    setResetLists({
      ...restLists,
      date: true,
    });
    setDate(date);
    setIsChDate(false);
  };

  const handleChangeUserInfo = async () => {
    let formatDate = restLists.date ? date : null;
    const statusData = await requestMainChangeUserInfo(
      token,
      restLists.profile,
      restLists.password,
      item.userId,
      nickName,
      gender.value,
      role.value,
      formatDate
    );

    if (statusData === 200) {
      alert("변경이 완료 되었습니다.");
      handleUpdateUserInfo(item.userId, nickName, gender.value, role.value);
      handleIsUserInfoDetailClose();
      return;
    } else if (statusData === 401) {
      handleTokenExpiry();
    } else {
      handleSystemError();
    }
    handleIsUserInfoDetailClose();
  };

  const handleNickNameValidation = async () => {
    if (window.confirm("사용자 정보를 변경하시겠습니까?")) {
      console.log(restLists);
      if (restLists.nickname) {
        const stuatusData = await requestMainUserNickNameValidation(
          token,
          nickName
        );

        if (stuatusData === 200) {
          handleChangeUserInfo();
        } else if (stuatusData === 400) {
          alert("이미 존재한 닉네임 입니다.");
        } else if (stuatusData === 401) {
          handleTokenExpiry();
        } else {
          handleSystemError();
        }
      } else {
        handleChangeUserInfo();
      }
    }
  };

  return (
    <div className="userinfo-detail">
      <div className="userinfo-detail-top">
        <UserInfoDetailTitle />
        <UserInfoDetailImg
          imgurl={item.profileImage}
          isRest={restLists.profile}
          handleFunc={handleResetProfile}
        />
        <div className="userinfo-content-box">
          <UserInfoDetailEmail email={item.email} />
          <UserInfoDetailNickNameBox
            text={nickName}
            handleText={handleNickName}
            isRest={restLists.nickname}
            handeFunc={handleResetNickName}
          />
          <UserInfoDetailName name={item.name} />
          <UserInfoDetailSuspend
            openChdate={openChdate}
            suspend={item.suspend.suspended}
            date={date}
          />
          <ChoiceItem
            leftTite={"성"}
            rightTitle={"별"}
            data={genderData}
            selectData={gender}
            handeFunc={handleGender}
          />
          <ChoiceItem
            leftTite={"등"}
            rightTitle={"급"}
            data={roleData}
            selectData={role}
            handeFunc={handleRole}
          />
          <UserInfoDetailPassword
            password={item.password}
            isPassword={isPassword}
            text={password}
            isRest={restLists.password}
            handleFunc={handleResetPassword}
          />
        </div>
      </div>
      <div className="userinfo-detail-bottom">
        <MainContentBtn title={"확인"} handleFunc={handleNickNameValidation} />
        <MainContentBtn
          title={"취소"}
          btnClass="gray-btn"
          handleFunc={handleIsUserInfoDetailClose}
        />
      </div>
      {isChDate ? (
        <UserInfoDetailChangeDate
          date={date}
          closeChDate={closeChDate}
          updateChDate={updateChDate}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserInfoDetail;
