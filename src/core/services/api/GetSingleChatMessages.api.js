import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const singleChatMessagesUrl = mainURL + "chat/";

const singleChatMessagesQuery = async (value) => {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    return axios.get(`${singleChatMessagesUrl}${value.chatId}/messages/`, config);
};

const SingleChatMessagesUseQuery = () => {
    return useMutation(singleChatMessagesQuery); //// useMutation for post, delete, update requests
};

export default SingleChatMessagesUseQuery;
