import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const sendRequestUrl = mainURL + "friendrequest/user/";

const SendRequestQuery = async (value) => {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    return axios.get(
        `${sendRequestUrl}${value.slug}/send/`,
        config
    );
};

const SendRequestUseQuery = () => {
    return useMutation(SendRequestQuery);
};

export default SendRequestUseQuery;
