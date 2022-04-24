import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "JWT " + token;
    }

    return config;
  },
  (err) => {}
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      // clearStorage();
      console.log("we have error ,401");

      // logout();
    }

    const expectedError =
      error.response &&
      error.response.state >= 400 &&
      error.response.status < 500;
    if (!expectedError) {
      console.log("we have error ,400,500,,");
      // tweak it later
      //console.log(error.response.data.message[0]);
      try {
        //showToast(error.response.data.message, ToastTypes.error);
      } catch (error) {
        // showToast(
        //   ["لطفا مواردی که دارای مشکل هستند را بررسی کنید"],
        //   ToastTypes.error
        // );
      }
    }
    return Promise.reject(error);
  }
);

const Http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default Http;
