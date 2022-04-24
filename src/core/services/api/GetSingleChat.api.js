import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const singleChatUrl = mainURL + "chat/";

const singleChatQuery = async (value) => {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    // console.log(await axios.get(`${singleChatUrl}${value.chatId}/`, config),'here')
    return await axios.get(`${singleChatUrl}${value.chatId}/`, config);
};

const SingleChatUseQuery = () => {
    return useMutation(singleChatQuery); //// useMutation for post, delete, update requests
};

export default SingleChatUseQuery;
