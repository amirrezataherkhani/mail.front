import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const loginUrl = mainURL + "timetable/";

const createTimeTableQuery = async (value) => {
  // value is the data coming from form

  return axios.post(loginUrl, value);
};

const CreateTimeTableUseQuery = () => {
  return useMutation(createTimeTableQuery); //// useMutation for post, delete, update requests
};

export default CreateTimeTableUseQuery;
