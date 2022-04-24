import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const leaveSingleChatUrl = mainURL + "chat/";

const leaveSingleChatQuery = async (value) => {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    return axios.post(`${leaveSingleChatUrl}${value.chatId}/exit/`, {}, config);
};

const LeaveSingleChatUseQuery = () => {
    return useMutation(leaveSingleChatQuery); //// useMutation for post, delete, update requests
};

export default LeaveSingleChatUseQuery;
