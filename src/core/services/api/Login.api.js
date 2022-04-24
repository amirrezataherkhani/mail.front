import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const loginUrl = mainURL + "auth/login/username/";
const infoUrl = mainURL + "auth/my_info/";

export const loginQuery = async (value) => {
    // value is the data coming from form
    const loginRes = await axios.post(loginUrl, value);
    const { token } = loginRes.data.data;

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const userRes = await axios.post(infoUrl, {}, config);
    return { loginRes, ...userRes };
};

const LoginUseQuery = () => {
    return useMutation(loginQuery); //// useMutation for post, delete, update requests
};

export default LoginUseQuery;
