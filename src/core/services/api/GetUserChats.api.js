import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const chatListUrl = mainURL + "chat/mine/";

const GetChatListQuery = async () => {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    return await axios.get(chatListUrl, config).then((res) => res.data)
};

const GetChatListUseQuery = () => {
    return useMutation(GetChatListQuery);
};

export default GetChatListUseQuery;
