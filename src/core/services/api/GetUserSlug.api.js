import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const userInfoUrl = mainURL + "me/";
const sendRequestUrl = "localhost:3000/friendrequest/user/"

const GetUserSlugQuery = async () => {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const slugRaw = await axios.get(userInfoUrl, config).then(res=>res.data.slug);
    const slug = `${sendRequestUrl}${slugRaw}/send/`
    return slug
};

const GetUserSlugUseQuery = () => {
    return useMutation(GetUserSlugQuery);
};

export default GetUserSlugUseQuery;
