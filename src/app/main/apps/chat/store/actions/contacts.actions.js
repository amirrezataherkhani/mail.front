import axios from "axios";

export const GET_CONTACTS = "[CHAT APP] GET CONTACTS";
export const SET_SELECTED_CONTACT_ID = "[CHAT APP] SET SELECTED CONTACT ID";
export const REMOVE_SELECTED_CONTACT_ID =
    "[CHAT APP] REMOVE SELECTED CONTACT ID";

export function getContacts() {
    const mainURL = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const request = axios.get(`${mainURL}user/friends/`, config);
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_CONTACTS,
                payload: response.data.friends,
            });
        });
}

export function setselectedContactId(contactId) {
    return {
        type: SET_SELECTED_CONTACT_ID,
        payload: contactId,
    };
}

export function removeSelectedContactId() {
    return {
        type: REMOVE_SELECTED_CONTACT_ID,
    };
}
