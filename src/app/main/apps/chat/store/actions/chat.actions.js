import axios from "axios";
import { setselectedContactId } from "./contacts.actions";
import { closeMobileChatsSidebar } from "./sidebars.actions";

export const GET_CHAT = "[CHAT APP] GET CHAT";
export const REMOVE_CHAT = "[CHAT APP] REMOVE CHAT";
export const SEND_MESSAGE = "[CHAT APP] SEND MESSAGE";
export const TURN_BACK_FROM_CHAT = "[CHAT APP] TURN BACK FROM CHAT";
var outputData;
export function getChat(userId, chatId, contactId, statusCode) {
    // console.log(userId, chatId, contactId, statusCode)
    return async (dispatch, getState) => {
        const mainURL = process.env.REACT_APP_BASE_URL;
        const messagesList = [];
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const messages = axios.get(`${mainURL}chat/${chatId}/messages`, config);
        return messages.then((response) => {
            const lastMessageTime = response.data.results[0]?.created;
            const dialogs = response.data.results;
            dialogs
                ? dialogs.map((dialog) => {
                      return messagesList.push({
                          who: dialog.sender.id,
                          message: dialog.message,
                          time: dialog.created,
                      });
                  })
                : console.log("no messages");
            const data = {
                chat: { id: userId, dialog: messagesList },
                userChatData: { chatId, contactId, lastMessageTime },
            };
            outputData = {
                config: {
                    url: `${mainURL}chat/${chatId}/messages`,
                    method: "get",
                    params: {
                        contactId,
                        userId,
                    },
                    headers: {
                        Accept: "application/json, text/plain, */*",
                    },
                    transformRequest: [null],
                    transformResponse: [null],
                    timeout: 0,
                    xsrfCookieName: "XSRF-TOKEN",
                    xsrfHeaderName: "X-XSRF-TOKEN",
                    maxContentLength: -1,
                },
                data,
                status: statusCode,
            };
            dispatch(setselectedContactId(contactId));
            dispatch(closeMobileChatsSidebar());
            return dispatch({
                type: GET_CHAT,
                chat: outputData.data.chat,
                userChatData: outputData.data.userChatData,
            });
        });
    };
}

export function removeChat() {
    return {
        type: REMOVE_CHAT,
    };
}

export function sendMessage(messageText, chatId, userId) {
    const mainURL = process.env.REACT_APP_BASE_URL;

    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const request = axios.post(
        `${mainURL}message/chat/${chatId}/`,
        {
            message: messageText,
        },
        config
    );
    console.log(request);
    return async (dispatch) =>
        request.then((response) => {
            console.log(outputData.data.userChatData, "chat action line 114");
            return dispatch({
                type: SEND_MESSAGE,
                message: response.data.message,
                userChatData: outputData.data.userChatData,
            });
        });
}
