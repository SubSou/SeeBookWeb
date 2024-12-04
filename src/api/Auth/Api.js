import axios from "axios";
import { localHost } from "../ApiLocalhost";

export const requestAuthLogin = async (email, password) => {
  try {
    const response = await axios.post(`${localHost}/api/user/login`, {
      email: email,
      password: password,
    });
    const responseData = {
      header: response.headers.authorization,
      data: response.data,
      statusData: response.status,
    };

    return responseData;
  } catch (error) {
    console.log(error);
    return { statusData: error.response.status };
  }
};
