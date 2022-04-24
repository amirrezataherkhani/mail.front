// import axios from "axios";

// export const GET_USER_DATA = "[CHAT PANEL] GET USER DATA";

// const mainURL = process.env.REACT_APP_BASE_URL;
// const getUserDataUrl = mainURL + "me/";

// export function getUserData() {
//     const token = localStorage.getItem("token");
//     const config = {
//         headers: { Authorization: `Bearer ${token}` },
//     };
//     const request = axios.get(getUserDataUrl, config);

//     return (dispatch) =>
//         request.then((response) => {
//             dispatch({
//                 type: GET_USER_DATA,
//                 payload: response.data,
//             });
//         });
// }
