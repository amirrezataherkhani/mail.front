import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const sendRequestUrl = mainURL + "friendrequest/";

const GetRequestsQuery = async () => {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    return await axios.get(`${sendRequestUrl}`, config).then((res) => res.data);
};

const GetRequestsUseQuery = () => {
    return useMutation(GetRequestsQuery);
};

export default GetRequestsUseQuery;
