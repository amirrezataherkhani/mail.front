import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const signUpUrl = mainURL + "auth/register/";

const RegisterQuery = async (value) => {
  return axios.post(signUpUrl, value);
};

const RegisterUseQuery = () => {
  return useMutation(RegisterQuery);
};

export default RegisterUseQuery;
