import axios from "axios";
import {
  isLoggedIn,
  readRefreshToken,
  readToken,
  storeToken,
} from "./localServices";
import { message } from "antd";

const NoAccessTokenURL = [
  "User/login/",
  "hardware/get-hardware-listing/",
  "ticketraise/Create-Ticket/",
];

const noAlerts = [];

const handleAlerts = (error) => {
  if (!noAlerts.includes(window.location.pathname)) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
      } else if (status === 500) {
        // message.error("Sorry, Internal server error.").then(() => {
        //   window.history.back();
        // });
      } else {
        if (error.response.data.errors) {
          if (error.response.data.errors.email) {
            message.error(`${error.response.data.errors.email}`);
          } else if (error.response.data.errors.non_field_errors) {
            message.error(`${error.response.data.errors.non_field_errors}`);
          } else {
            message.error(`${error.response.data.errors}`);
          }
        }
      }
    } else {
      message.error("An error occurred");
    }
  }
};

const handleSuccess = (response) => {
  if (!noAlerts.includes(window.location.pathname)) {
    if (response.status === 200) {
      if (response.data.message) {
        message.success(response.data.message);
      }
    } else if (response.status === 201) {
      if (response.data.message) {
        message.success(response.data.message);
      }
    }
  }
};

let isRefreshing = false;

const refreshAccessToken = async () => {
  isRefreshing = true;
  try {
    let newAccessToken;
    if (isLoggedIn) {
      const response = await axios
        .post("user/token/refresh/", {
          refresh: readRefreshToken(),
        })
        .catch((err) => {
          window.location.href = "/login";
        });
      console.log("newAccessToken", response);
      newAccessToken = response.access;
      storeToken(newAccessToken);
    } else {
      window.location.href = "/login";
    }
    isRefreshing = false;
    return newAccessToken;
  } catch (error) {
    isRefreshing = false;
    console.error("Error refreshing access token:", error);
    throw error;
  }
};

axios.interceptors.request.use(
  (config) => {
    const accessToken = readToken();
    let AccessTokenNeeded = true;
    NoAccessTokenURL.map((data) => {
      if (config.url === data) {
        console.log(config.url);
        AccessTokenNeeded = false;
      }
    });

    if (accessToken && AccessTokenNeeded) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    handleSuccess(response);
    return response;
  },
  async (error) => {
    handleAlerts(error);
    if (error.response) {
      const status = error.response.status;
      const originalRequest = error.config;

      if (status === 401 && isRefreshing !== true) {
        try {
          const newAccessToken = await refreshAccessToken();
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest); // Retry the original request with the new token
        } catch (refreshError) {
          // Handle refresh token error (e.g., redirect to login page)
          console.error("Error refreshing access token:", refreshError);
        }
      }
    } else if (error.request) {
      // console.error("Request Error:", error.request);
    } else {
      // console.error("Error Message:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axios;
