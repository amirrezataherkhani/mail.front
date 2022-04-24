import { FuseScrollbars, FuseAnimateGroup, FuseUtils } from "@fuse";
import {
    AppBar,
    Avatar,
    ListItemIcon,
    List,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
    Toolbar,
    Icon,
    IconButton,
    Input,
    Paper,
    Modal,
    Button,
    Box,
} from "@material-ui/core";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import GridOnIcon from "@material-ui/icons/GridOn";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";
import StatusIcon from "./StatusIcon";
import Banner from "./Banner";
import Form from "./Form";
import { Link, useHistory } from "react-router-dom";
import GetContactsUseQuery from "core/services/api/GetContacts.api";
import ContactCard from "./ContactCard";
import GetChatListUseQuery from "core/services/api/GetUserChats.api";
import ChatItem from "./ChatItem";
import DeleteSingleChatUseQuery from "core/services/api/DeleteChat.api";
import ContactListItem from "./ContactListItem";
import CreateChannelUseQuery from "core/services/api/CreateChannel.api";
import SingleChatMessagesUseQuery from "core/services/api/GetSingleChatMessages.api";
import GetUserDataUseQuery from "core/services/api/GetUserData.api";

import { forEach } from "lodash";
import GetUserIdUseQuery from "core/services/api/GetUserId";
import LeaveSingleChatUseQuery from "core/services/api/LeaveChat.api";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function ChatsSidebar(props) {
    const user = useSelector(({ auth }) => auth.user.data);
    const dispatch = useDispatch();
    const [channelModalOpen, setChannelOpen] = useState(false);
    const [groupModalOpen, setGroupOpen] = useState(false);
    const [statusMenuEl, setStatusMenuEl] = useState(null);
    const [moreMenuEl, setMoreMenuEl] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [friends, setFriends] = useState([]);
    const [open, setOpen] = useState(false);
    const [chats, setChats] = useState([]);
    const deleteSingleChatQuery = DeleteSingleChatUseQuery();
    const LeaveChatQuery = LeaveSingleChatUseQuery();
    const getChatListQuery = GetChatListUseQuery();
    const contactsQuery = GetContactsUseQuery();
    let history = useHistory();

    function handleDeleteChat(chatId) {
        console.log(chatId);
        deleteSingleChatQuery.mutate(
            { chatId },
            {
                onSuccess: (result) => {
                    console.log(result);
                    setChats(() => chats);
                },
            }
        );
    }
    const handleLeaveChat = (chatId) => {
        console.log(chatId);
        LeaveChatQuery.mutate(
            { chatId },
            {
                onSuccess: (result) => {
                    console.log(result);
                },
                onError: (error) => {
                    console.log(error.response.data);
                },
            }
        );
    };

    function handleMoreMenuClick(event) {
        setMoreMenuEl(event.currentTarget);
    }

    const getContacts = () => {
        contactsQuery.mutate(
            {},
            {
                onSuccess: (result) => {
                    setFriends(result.friends);
                },
            }
        );
    };

    const getChats = () => {
        getChatListQuery.mutate(
            {},
            {
                onSuccess: (result) => {
                    setChats(result.results);
                },
                onError: (err) => {
                    console.log(err);
                },
            }
        );
    };

    function handleMoreMenuClose(event) {
        setMoreMenuEl(null);
    }

    const handleLogOutCLicked = (event) => {
        localStorage.removeItem("token");
        history.push("/login");
    };

    function handleStatusMenuClick(event) {
        event.preventDefault();
        event.stopPropagation();
        setStatusMenuEl(event.currentTarget);
    }

    function handleStatusSelect(event, status) {
        event.preventDefault();
        event.stopPropagation();
        dispatch(
            Actions.updateUserData({
                ...user,
                status,
            })
        );
        setStatusMenuEl(null);
    }

    function handleStatusClose(event) {
        event.preventDefault();
        event.stopPropagation();
        setStatusMenuEl(null);
    }

    function handleSearchText(event) {
        setSearchText(event.target.value);
    }

    const handleGroupModalOpen = () => {
        setGroupOpen(true);
    };

    const handleGroupModalClose = () => {
        setGroupOpen(false);
    };
    const handleChannelModalOpen = () => {
        setChannelOpen(true);
    };

    const handleChannelModalClose = () => {
        setChannelOpen(false);
    };

    useEffect(() => {
        getContacts();
        getChats();
    }, []);

    return (
        <div className="flex flex-col flex-auto h-full">
            <AppBar position="static" color="default" elevation={1}>
                <Toolbar className="flex justify-between items-center px-16 pr-4">
                    {user && (
                        <div
                            className="relative w-40 h-40 p-0 cursor-pointer"
                            onClick={() => dispatch(Actions.openUserSidebar())}
                        >
                            <Avatar
                                src=""
                                alt={user.displayName}
                                className="w-40 h-40"
                            >
                                {!user.avatar || user.avatar === ""
                                    ? user.displayName[0]
                                    : ""}
                            </Avatar>
                            <Typography>{user.displayName}</Typography>
                            <div
                                className="absolute right-0 bottom-0 -m-4 z-10 cursor-pointer"
                                aria-owns={statusMenuEl ? "switch-menu" : null}
                                aria-haspopup="true"
                                onClick={handleStatusMenuClick}
                            ></div>
                        </div>
                    )}

                    <div>
                        <IconButton
                            aria-owns={moreMenuEl ? "chats-more-menu" : null}
                            aria-haspopup="true"
                            onClick={handleMoreMenuClick}
                        >
                            <Icon>more_vert</Icon>
                        </IconButton>
                        <Menu
                            id="chats-more-menu"
                            anchorEl={moreMenuEl}
                            open={Boolean(moreMenuEl)}
                            onClose={handleMoreMenuClose}
                        >
                            <MenuItem
                                onClick={() => {
                                    dispatch(Actions.openUserSidebar());
                                    setMoreMenuEl(null);
                                }}
                            >
                                Edit Profile
                            </MenuItem>
                            <MenuItem>
                                <button
                                    type="button"
                                    onClick={handleChannelModalOpen}
                                >
                                    Create Channel
                                </button>
                                <Modal
                                    open={channelModalOpen}
                                    onClose={handleChannelModalClose}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    className="flex justify-center items-center"
                                >
                                    <Form
                                        component="Channel"
                                        handleChannelModalClose={
                                            handleChannelModalClose
                                        }
                                        friends={friends}
                                    ></Form>
                                </Modal>
                            </MenuItem>
                            <MenuItem>
                                <button
                                    type="button"
                                    onClick={handleGroupModalOpen}
                                >
                                    Create Group
                                </button>
                                <Modal
                                    open={groupModalOpen}
                                    onClose={handleGroupModalClose}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    className="flex justify-center items-center"
                                >
                                    <Form
                                        component="Group"
                                        handleGroupModalClose={
                                            handleGroupModalClose
                                        }
                                        friends={friends}
                                    ></Form>
                                </Modal>
                            </MenuItem>
                            <MenuItem onClick={handleLogOutCLicked}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
                {useMemo(
                    () => (
                        <Toolbar className="px-16">
                            <Paper
                                className="flex p-4 items-center w-full px-8 py-4 rounded-8"
                                elevation={1}
                            >
                                <Icon className="mr-8" color="action">
                                    search
                                </Icon>

                                <Input
                                    placeholder="Search or start new chat"
                                    className="flex flex-1"
                                    disableUnderline
                                    fullWidth
                                    value={searchText}
                                    inputProps={{
                                        "aria-label": "Search",
                                    }}
                                    onChange={handleSearchText}
                                />
                            </Paper>
                        </Toolbar>
                    ),
                    [searchText]
                )}
            </AppBar>
            <FuseScrollbars className="overflow-y-auto flex-1">
                <List className="w-full">
                    {useMemo(() => {
                        // function getFilteredArray(arr, searchText) {
                        //     if (searchText.length === 0) {
                        //         return arr;
                        //     }
                        //     return FuseUtils.filterArrayByString(
                        //         arr,
                        //         searchText
                        //     );
                        // }

                        // const chatListContacts =
                        //     contacts.length > 0 && user && user.chatList
                        //         ? user.chatList.map((_chat) => ({
                        //               ..._chat,
                        //               ...contacts.find(
                        //                   (_contact) =>
                        //                       _contact.id === _chat.contactId
                        //               ),
                        //           }))
                        //         : [];

                        // const chatListArr = getFilteredArray(
                        //     [...chatListContacts],
                        //     searchText
                        // );
                        return (
                            <React.Fragment>
                                <FuseAnimateGroup
                                    enter={{
                                        animation: "transition.expandIn",
                                    }}
                                    className="flex flex-col flex-shrink-0"
                                >
                                    <Banner />

                                    <Typography
                                        className="font-300 text-20 px-16 py-24"
                                        color="secondary"
                                    >
                                        Chats
                                    </Typography>
                                    {/* {chats.map((chat) => console.log(chat))} */}
                                    {chats.map((chat) => (
                                        <ChatItem
                                            key={chat.id}
                                            chat={chat}
                                            handleLeaveChat={handleLeaveChat}
                                            handleDeleteChat={handleDeleteChat}
                                        />
                                    ))}

                                    <Typography
                                        className="font-300 text-20 px-16 py-24"
                                        color="secondary"
                                    >
                                        Contacts
                                    </Typography>
                                    {friends.map((friend) => (
                                        <ContactCard
                                            key={friend.id}
                                            contact={friend}
                                        />
                                    ))}
                                </FuseAnimateGroup>
                            </React.Fragment>
                        );
                    }, [friends, chats, searchText, dispatch, open])}
                </List>
            </FuseScrollbars>
        </div>
    );
}

export default ChatsSidebar;
