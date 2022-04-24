import React from "react";
import {
    Avatar,
    List,
    ListItemText,
    Typography,
    ListItem,
    Icon,
} from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import SendRequestUseQuery from "core/services/api/SendRequest.api";

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

function SearchResult(props) {
    const classes = useStyles(props);
    const sendRequestQuery = SendRequestUseQuery();

    const handleSendRequest = async (value) => {
        sendRequestQuery.mutate(
            {
                slug: value,
            },
            {
                onSuccess: (result) => {
                    console.log(result);
                },
                onError: (error) => {
                    console.log(error);
                },
            }
        );
    };
    return (
        <List className="w-full">
            <Typography
                className="font-300 text-20 px-16 py-24"
                color="secondary"
            >
                Search Result
            </Typography>{" "}
            <ListItem
                button
                className={clsx(
                    classes.contactListItem,
                    "px-16 py-12 min-h-92 cursor-default"
                )}
            >
                <div className="relative mr-16">
                    <Avatar
                        src={props.person.profilePic}
                        alt={props.person.username}
                    >
                        {!props.person.profilePic ||
                        props.person.profilePic === ""
                            ? props.person.username[0]
                            : ""}
                    </Avatar>
                </div>

                <ListItemText
                    classes={{
                        root: "min-w-px",
                        secondary: "truncate",
                    }}
                    primary={props.person.username}
                />
                <Icon
                    className="cursor-pointer"
                    onClick={() => handleSendRequest(props.person.slug)}
                >
                    add_circle
                </Icon>
            </ListItem>
        </List>
    );
}

export default SearchResult;
