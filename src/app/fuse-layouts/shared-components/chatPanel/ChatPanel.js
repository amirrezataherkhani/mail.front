import React, { useCallback, useEffect } from "react";
import keycode from "keycode";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import withReducer from "app/store/withReducer";

function ChatPanel(props) {
    const dispatch = useDispatch();
    const state = useSelector(({ chatPanel }) => chatPanel.state);

    const handleDocumentKeyDown = useCallback(
        (event) => {
            if (keycode(event) === "esc") {
                dispatch(Actions.closeChatPanel());
            }
        },
        [dispatch]
    );

    useEffect(() => {
        // dispatch(Actions.getUserData());
        // dispatch(Actions.getContacts());
        return () => {
            document.removeEventListener("keydown", handleDocumentKeyDown);
        };
    }, [dispatch, handleDocumentKeyDown]);

    useEffect(() => {
        if (state) {
            document.addEventListener("keydown", handleDocumentKeyDown);
        } else {
            document.removeEventListener("keydown", handleDocumentKeyDown);
        }
    }, [handleDocumentKeyDown, state]);

    return <></>;
}

export default withReducer("chatPanel", reducer)(ChatPanel);
