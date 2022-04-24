import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const requestIdentifierUrl = mainURL + "friendrequest/";

const IdentifyRequestQuery = async (value) => {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const id = value.id;
    const status = value.status;
    // console.log(
    return await axios.put(`${requestIdentifierUrl}${id}/`, { status }, config)
    // );
    //   return axios.post(requestIdentifierUrl, value);
};

const IdentifyRequestUseQuery = () => {
    return useMutation(IdentifyRequestQuery);
};

export default IdentifyRequestUseQuery;
