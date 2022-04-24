import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const userInfoUrl = mainURL + "auth/my_info/";

const GetUserDataQuery = async () => {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    return await axios.post(userInfoUrl, {}, config).then((res) => res.data);
};

const GetUserDataUseQuery = () => {
    return useMutation(GetUserDataQuery);
};

export default GetUserDataUseQuery;
