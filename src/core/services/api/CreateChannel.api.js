import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const createChannelUrl = mainURL + "chat/";

const createChannelQuery = async (value) => {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    return axios.post(createChannelUrl, value, config);
};

const CreateChannelUseQuery = () => {
    return useMutation(createChannelQuery);
};

export default CreateChannelUseQuery;
