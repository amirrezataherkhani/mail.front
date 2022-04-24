import { useHistory } from "react-router-dom";
import { WindowScroller } from "react-virtualized";
import * as Actions from "../actions";
import history from "@history";

const initialState = {
    role: [], //guest
    data: {
        displayName: "",
        photoURL: "assets/images/avatars/Velazquez.jpg",
        email: "johndoe@withinpiddxels.com",
        shortcuts: ["calendar", "mail", "contacts", "todo"],
    },
};

const user = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_USER_DATA: {
            localStorage.setItem("userData", JSON.stringify(action.payload));
            return {
                ...initialState,
                ...action.payload,
            };
        }
        case Actions.REMOVE_USER_DATA: {
            return {
                ...initialState,
            };
        }
        case Actions.USER_LOGGED_OUT: {
            localStorage.removeItem("userData");
            return initialState;
        }

        case Actions.DOCUMENT_REFRESH: {
            const user = localStorage.getItem("userData");
            if (!user) {
                history.push("/login/");
                console.log("no user in localstorage");
            } else {
                console.log("else executed");
                return {
                    ...initialState,
                    ...JSON.parse(localStorage.getItem("userData")),
                };
            }
        }
        default: {
            return state;
        }
    }
};

export default user;
