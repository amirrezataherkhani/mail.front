import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const deleteSingleChatUrl = mainURL + "chat/";

const deleteSingleChatQuery = async (value) => {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    return axios.delete(`${deleteSingleChatUrl}${value.chatId}/`, config);
};

const DeleteSingleChatUseQuery = () => {
    return useMutation(deleteSingleChatQuery); //// useMutation for post, delete, update requests
};

export default DeleteSingleChatUseQuery;
