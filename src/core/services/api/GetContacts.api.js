import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const contactsUrl = mainURL + "user/friends/";

const GetContactsQuery = async () => {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    return await axios.get(contactsUrl, config).then((res) => res.data)
};

const GetContactsUseQuery = () => {
    return useMutation(GetContactsQuery);
};

export default GetContactsUseQuery;
