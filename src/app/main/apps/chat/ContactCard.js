import React, { useEffect, useMemo, useState } from "react";
import {
    Avatar,
    ListItem,
    ListItemText,
    Icon,
    IconButton,
    Menu,
    MenuItem,
    Button,
} from "@material-ui/core";
import clsx from "clsx";
import StatusIcon from "./StatusIcon";
import { makeStyles } from "@material-ui/styles";
import CreateChatUseQuery from "core/services/api/CreateChat.api";

const useStyles = makeStyles((theme) => ({
    contactListItem: {
        borderBottom: "1px solid " + theme.palette.divider,
        "&.active": {
            backgroundColor: theme.palette.background.paper,
        },
    },
    unreadBadge: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
    },
}));

function ContactCard(props) {
    const classes = useStyles(props);
    const [moreMenuEl, setMoreMenuEl] = useState(null);
    const createChatQuery = CreateChatUseQuery();
    function handleMoreMenuClick(event) {
        setMoreMenuEl(event.currentTarget);
    }

    function handleMoreMenuClose(event) {
        setMoreMenuEl(null);
    }

    const createChat = (data) => {
        createChatQuery.mutate(
            {
                name: data.username,
                type: "P",
                users: [data.id],
            },
            {
                onSuccess: (result) => {
                    console.log("chat started");
                },
                onError: (err) => {
                    console.log(err);
                },
            }
        );
    };

    return (
        <ListItem
            button
            className={clsx(classes.contactListItem, "px-16 py-12 min-h-92", {
                active: props.selectedContactId === props.contact.id,
            })}
        >
            <>
                <div className="mr-5">
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
                        <MenuItem onClick={handleMoreMenuClose}>Block</MenuItem>
                        <MenuItem onClick={handleMoreMenuClose}>
                            Remove Friend
                        </MenuItem>
                    </Menu>
                </div>
                <div className="relative mr-16">
                    <div className="absolute right-0 bottom-0 -m-4 z-10">
                        <StatusIcon status={props.contact.status} />
                    </div>

                    <Avatar
                        src={props.contact.profilePicture}
                        alt={props.contact.username}
                    >
                        {!props.contact.profilePicture ||
                        props.contact.profilePicture === ""
                            ? props.contact.username[0]
                            : ""}
                    </Avatar>
                </div>

                <ListItemText
                    classes={{
                        root: "min-w-px",
                        secondary: "truncate",
                    }}
                    primary={props.contact.username}
                    // secondary={props.contact.mood}
                />
                <Button
                    className="bg-blue-light"
                    onClick={() => createChat(props.contact)}
                >
                    Start Chat
                </Button>
            </>
        </ListItem>
    );
}

export default ContactCard;
