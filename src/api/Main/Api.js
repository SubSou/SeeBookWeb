import axios from "axios";
import { localHost } from "../ApiLocalhost";

export const requestMainUserInfoList = async (
  token,
  page,
  queryType,
  query
) => {
  try {
    const response = await axios.get(
      `${localHost}/api/admin/user/list?page=${page}&queryType=${queryType}&query=${query}`,
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    const repsonseData = {
      data: response.data,
      statusData: response.status,
    };

    return repsonseData;
  } catch (error) {
    return error.response.status;
  }
};

export const requestMainUserInfoDetail = async (token, userId) => {
  try {
    const response = await axios.get(
      `${localHost}/api/admin/user/detail?userId=${userId}`,
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    const repsonseData = {
      data: response.data,
      statusData: response.status,
    };

    return repsonseData;
  } catch (error) {
    return error.response.status;
  }
};

export const requestMainUserNickNameValidation = async (token, nickname) => {
  try {
    const response = await axios.get(
      `${localHost}/api/user/validation-nickname?nickname=${nickname}`,
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

export const requestMainChangeUserInfo = async (
  token,
  resetProfileImage,
  resetPassword,
  userId,
  nickname,
  gender,
  role,
  endDate
) => {
  // console.log(
  //   token,
  //   resetProfileImage,
  //   resetPassword,
  //   userId,
  //   nickname,
  //   gender,
  //   role,
  //   endDate
  // );

  try {
    const response = await axios.put(
      `${localHost}/api/admin/user/modify`,
      {
        // 요청 데이터
        resetProfileImage, // true : 초기화 , false: 유지
        resetPassword, //true : 초기화 , false: 유지
        userId,
        nickname,
        gender, // MALE, FEMALE
        role, // 사용자, 관리자
        endDate, // -> null로 보내면 변경x, 9999-99-99 16:20:20 형태로 전송
      },
      {
        // 헤더 설정
        headers: {
          Authorization: token, // 토큰을 Authorization 헤더에 추가
        },
      }
    );

    return response.status;
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
};

export const requestMainReviewLists = async (token, page, queryType, query) => {
  try {
    const response = await axios.get(
      `${localHost}/api/admin/review/list?page=${page}&queryType=${queryType}&query=${query}`,
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    const repsonseData = {
      data: response.data,
      statusData: response.status,
    };

    return repsonseData;
  } catch (error) {
    return error.response.status;
  }
};

export const requestMainReviewDelete = async (token, reviewId) => {
  try {
    const response = await axios.delete(
      `${localHost}/api/admin/review/delete?reviewId=${reviewId}`,
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );
    return response.status;
  } catch (error) {
    console.log("에러", JSON.stringify(error.response));
    return error.response.status;
  }
};

export const requestMainEventLists = async (token, page, queryType, query) => {
  try {
    const response = await axios.get(
      `${localHost}/api/admin/event/list?page=${page}&queryType=${queryType}&query=${query}`,
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    const repsonseData = {
      data: response.data,
      statusData: response.status,
    };

    return repsonseData;
  } catch (error) {
    return error.response.status;
  }
};

export const requestMainCustomerLists = async (
  token,
  page,
  queryType,
  query
) => {
  try {
    const response = await axios.get(
      `${localHost}/api/admin/support/list?page=${page}&queryType=${queryType}&query=${query}`,
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    const repsonseData = {
      data: response.data,
      statusData: response.status,
    };

    return repsonseData;
  } catch (error) {
    return error.response.status;
  }
};

export const requestMainSupportDetail = async (token, supportId) => {
  try {
    const response = await axios.get(
      `${localHost}/api/admin/support/detail?supportId=${supportId}`,
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    const repsonseData = {
      data: response.data,
      statusData: response.status,
    };

    return repsonseData;
  } catch (error) {
    return error.response.status;
  }
};

export const requestMainSupportProcess = async (
  token,
  supportId,
  replyContent
) => {
  try {
    const response = await axios.post(
      `${localHost}/api/admin/support/process`,
      {
        supportId: supportId,
        replyContent: replyContent,
      },
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );
    console.log(response);

    return response.status;
  } catch (error) {
    console.log("에러", JSON.stringify(error.response));
    return error.response.status;
  }
};

export const requestMainReportLists = async (token, page, queryType, query) => {
  try {
    const response = await axios.get(
      `${localHost}/api/admin/report/list?page=${page}&queryType=${queryType}&query=${query}`,
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    const repsonseData = {
      data: response.data,
      statusData: response.status,
    };

    return repsonseData;
  } catch (error) {
    return error.response.status;
  }
};

export const requestMainReportDetail = async (token, reportId) => {
  try {
    const response = await axios.post(
      `${localHost}/api/admin/report/detail`,
      {
        reportId: reportId,
      },
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );
    const repsonseData = {
      data: response.data,
      statusData: response.status,
    };

    return repsonseData;
  } catch (error) {
    console.log("에러", JSON.stringify(error.response));
    return error.response.status;
  }
};

export const requestMainReportProcess = async (
  token,
  reportId,
  reportedId,
  reviewId,
  reportType,
  suspensionPeriod,
  resetProfileImage,
  resetNickname,
  deleteReview
) => {
  console.log("토큰", token);
  console.log("리포트 ID", reportId);
  console.log("리포트edID", reportedId);
  console.log("리뷰ID", reportId);
  console.log("리포트 타입", reportType);
  console.log("정지 기간", suspensionPeriod);
  console.log("프로필 초기화", resetProfileImage);
  console.log("닉네임 초기화", resetNickname);
  console.log("리뷰삭제 초기화", deleteReview);

  try {
    /**
     *   reportId: "Long",
        reportedId: "Long",
        reviewId: "Long",
        reportType: "String",
        suspensionPeriod: "int", 0일 -> 0, 30일 ->30, 영구정지 -> 9999
        resetProfileImage : "boolean", true : 초기화 , false: 유지
        resetNickname : "boolean", true : 초기화 , false: 유지
        deleteReview : "boolean", true : 삭제 , false: 유지
     */

    const response = await axios.post(
      `${localHost}/api/admin/report/process`,
      {
        reportId,
        reportedId,
        reviewId,
        reportType,
        suspensionPeriod,
        resetProfileImage,
        resetNickname,
        deleteReview,
      },
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    return response.status;
  } catch (error) {
    console.log("에러", error);
    return error.response.status;
  }
};

export const requestMainDeleteReport = async (token, reportId) => {
  try {
    const response = await axios.delete(
      `${localHost}/api/admin/report/delete`,
      {
        headers: {
          Authorization: `${token}`,
        },

        data: {
          reportId: reportId,
        },
      }
    );

    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

export const requestMainDeleteSupport = async (token, supportId) => {
  try {
    const response = await axios.delete(
      `${localHost}/api/admin/support/delete`,
      {
        headers: {
          Authorization: `${token}`,
        },

        data: {
          supportId: supportId,
        },
      }
    );
    console.log(response);

    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

export const requestMainDeleteUser = async (token, userId) => {
  try {
    const response = await axios.delete(`${localHost}/api/admin/user/delete`, {
      headers: {
        Authorization: `${token}`,
      },

      data: {
        userId: userId,
      },
    });

    return response.status;
  } catch (error) {
    console.log(error.response);
    return error.response.status;
  }
};

export const requestMainLogout = async (token, provider) => {
  try {
    const response = await axios.post(
      `${localHost}/api/user/logout`,
      {
        provider: provider, // provider 필드를 요청 본문에 포함
      },
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    return response.status;
  } catch (error) {
    console.log("에러", error.response);
    return error.response.status;
  }
};
