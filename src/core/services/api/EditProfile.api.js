import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const loginUrl = mainURL + "/auth/my_info/update/user/";

const editProfileQuery = async (value) => {
  // value is the data coming from form

  return axios.post(loginUrl, value);
};

const EditProfileUseQuery = () => {
  return useMutation(editProfileQuery); //// useMutation for post, delete, update requests
};

export default EditProfileUseQuery;
