import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const findUserUrl = mainURL + "user/";

const FindUserQuery = async (value) => {
  return axios.get(findUserUrl+value.slug).then(res=>res.data);
};

const FindUserUseQuery = () => {
  return useMutation(FindUserQuery);
};

export default FindUserUseQuery;
