import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const userInfoUrl = mainURL + "me/";

const GetUserIdQuery = async () => {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const slugRaw = await axios.get(userInfoUrl, config).then(res=>res);
    return slugRaw
};

const GetUserIdUseQuery = () => {
    return useMutation(GetUserIdQuery);
};

export default GetUserIdUseQuery;
