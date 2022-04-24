import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const userInfoUrl = mainURL + "me/";
const sendRequestUrl = "localhost:3000/friendrequest/user/";

const GetUserTemporaryLinkQuery = async () => {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const temporaryLinkRaw = await axios
        .get(userInfoUrl, config)
        .then((res) => res.data.temporaryLink);
    const slug = `${sendRequestUrl}${temporaryLinkRaw}/send/`;
    return slug;
};

const GetUserTemporaryLinkUseQuery = () => {
    return useMutation(GetUserTemporaryLinkQuery);
};

export default GetUserTemporaryLinkUseQuery;
