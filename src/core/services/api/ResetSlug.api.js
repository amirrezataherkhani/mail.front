import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const resetSlugUrl = mainURL + "user/link/change/";

const ResetSlugQuery = async () => {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const slugRaw = await axios
        .post(resetSlugUrl, {}, config)
        .then((res) => res.data.slug);
    const slug = `127.0.0.1:8001/friendrequest/user/${slugRaw}/send/`;
    return slug;
};

const ResetSlugUseQuery = () => {
    return useMutation(ResetSlugQuery);
};

export default ResetSlugUseQuery;
