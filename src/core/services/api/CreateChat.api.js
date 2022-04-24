import axios from "axios";
import { result } from "lodash";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const createChatUrl = mainURL + "chat/";

const createChatQuery = async (value) => {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    return axios.post(createChatUrl, value, config);
};

const CreateChatUseQuery = () => {
    return useMutation(createChatQuery); //// useMutation for post, delete, update requests
};

export default CreateChatUseQuery;
