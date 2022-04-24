import React, { useEffect, useMemo, useState } from "react";
import {
    Avatar,
    ListItem,
    ListItemText,
    Icon,
    IconButton,
    Menu,
    MenuItem,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import SingleChatUseQuery from "core/services/api/GetSingleChat.api";
import SingleChatMessagesUseQuery from "core/services/api/GetSingleChatMessages.api";
import * as Actions from "./store/actions";
import GetUserIdUseQuery from "core/services/api/GetUserId";

function ChatItem(props) {
    const user = useSelector(({ auth }) => auth.user.data);
    const currentUser = user.displayName;
    const getSignelChatQuery = SingleChatUseQuery();
    const SingleChatMessagesQuery = SingleChatMessagesUseQuery();
    const getUserInfoQuery = GetUserIdUseQuery();
    const [moreMenuEl, setMoreMenuEl] = useState(null);
    const [opponentId, setOpponentId] = useState(null);
    const [statusCode, setStatusCode] = useState(null);

    const [userId, setUserId] = useState(null);
    const dispatch = useDispatch();

    function handleMoreMenuClick(event) {
        setMoreMenuEl(event.currentTarget);
    }

    function handleMoreMenuClose(event) {
        setMoreMenuEl(null);
    }

    const getSingleChat = React.useCallback((chatId) => {
        getSignelChatQuery.mutate(
            { chatId },
            {
                onSuccess: (result) => {
                    setOpponentId(result.data.users[0]);
                    setStatusCode(result.status);
                    dispatch(
                        Actions.getChat(
                            userId,
                            props.chat.id,
                            result.data.users[0],
                            result.status
                        )
                    );
                    dispatch(Actions.turnBackFromChat(true));
                    console.log(result, "getSignelChatQuery");
                },
            }
        );

        SingleChatMessagesQuery.mutate({ chatId });
    });

    const getUserInfo = () => {
        getUserInfoQuery.mutate(
            {},
            {
                onSuccess: (result) => {
                    setUserId(result.data.id);
                },
            }
        );
    };

    useEffect(() => {
        getUserInfo();
    }, []);
    return (
        <ListItem
            button
            // onClick={() => {
            //     getSingleChat(props.chat.id);
            //     dispatch(
            //         Actions.getChat(
            //             userId,
            //             props.chat.id,
            //             opponentId,
            //             statusCode
            //         )
            //     );
            //     dispatch(Actions.turnBackFromChat(true));
            // }}
        >
            {useMemo(() => {
                return (
                    <>
                        <ListItem
                            button
                            onClick={() => {
                                getSingleChat(props.chat.id);
                            }}
                        >
                            <div className="mr-5">
                                <IconButton
                                    aria-owns={
                                        moreMenuEl ? "chats-more-menu" : null
                                    }
                                    aria-haspopup="true"
                                    onClick={(event) => {
                                        handleMoreMenuClick(event);
                                    }}
                                >
                                    <Icon>more_vert</Icon>
                                </IconButton>
                                <Menu
                                    id="chats-more-menu"
                                    anchorEl={moreMenuEl}
                                    open={Boolean(moreMenuEl)}
                                    onClose={handleMoreMenuClose}
                                >
                                    {" "}
                                    
                                    {/* <MenuItem
                                        onClick={() => {
                                            handleMoreMenuClose();
                                            props.handleDeleteChat(
                                                props.chat.id
                                            );
                                        }}
                                    >
                                        Delete Chat
                                    </MenuItem> */}
                                    {userId===props.chat.owner.id?
                                    
                                    <MenuItem
                                        onClick={() => {
                                            handleMoreMenuClose();
                                            props.handleDeleteChat(
                                                props.chat.id
                                            );
                                        }}
                                    >
                                        Delete Chat
                                    </MenuItem>
                                    :
                                    <MenuItem
                                        onClick={() => {
                                            handleMoreMenuClose();
                                            props.handleLeaveChat(
                                                props.chat.id
                                            );
                                        }}
                                    >
                                        Leave Chat
                                    </MenuItem>
                                    }




                                    
                                </Menu>
                            </div>
                            <div className="relative mr-16">
                                <Avatar
                                    src={
                                        props.chat.profilePicture !== undefined
                                            ? props.chat.profilePicture
                                            : ""
                                    }
                                    alt={props.chat.name}
                                >
                                    {!props.chat.profilePicture ||
                                    props.chat.profilePicture === ""
                                        ? props.chat.name[0]
                                        : ""}
                                </Avatar>
                            </div>

                            <ListItemText
                                classes={{
                                    root: "min-w-px",
                                    secondary: "truncate",
                                }}
                                primary={
                                    currentUser === props.chat.name
                                        ? props.chat.owner.username
                                        : props.chat.name
                                }
                                secondary="text here"
                            />
                        </ListItem>
                    </>
                );
            }, [
                opponentId,
                moreMenuEl,
                props,
                currentUser,
                getSingleChat,
                dispatch,
                userId,
                statusCode,
            ])}
        </ListItem>
    );
}

export default ChatItem;
