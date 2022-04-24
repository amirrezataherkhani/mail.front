import React, { useMemo, useState } from "react";
import "./Form.css";
import CreateChatUseQuery from "../../../../core/services/api/CreateChat.api";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { ArrowDropDownTwoTone, RemoveCircle } from "@material-ui/icons";
import { styled } from "@material-ui/styles";

const Form = (props) => {
    const createChatQuery = CreateChatUseQuery();
    const [anchorEl, setAnchorEl] = useState(null);
    const [users, setUsers] = useState([]);

    const handleSubmitButton = (e) => {
        e.preventDefault();
        createChatQuery.mutate(
            {
                name: e.target[0].value,
                type: props.component.charAt(0),
                users: users,
            },
            {
                onSuccess: (result) => {
                    console.log(result);
                },
                onError: (error) => {
                    console.log(error.response);
                },
            }
        );
        if (props.component === "Group") {
            props.handleGroupModalClose();
        } else if (props.component === "Channel") {
            props.handleChannelModalClose();
        }
    };

    const open = Boolean(anchorEl);

    const addToList = (friend) => {
        if (users.indexOf(friend) === -1) {
            setUsers([...users, friend.id]);
        }
    };

    const removeFromList = (friend) => {
        const usersCopy = [...users];

        const index = usersCopy.indexOf(friend.id);
        if (index > -1) {
            usersCopy.splice(index, 1);
        }
        setUsers([...usersCopy]);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div class="login-box">
            {useMemo(() => {
                return (
                    <div>
                        <h2>New {props.component}</h2>
                        <form onSubmit={handleSubmitButton}>
                            <div class="user-box">
                                <input
                                    type="text"
                                    name="name"
                                    required="required"
                                />
                                <label>{props.component} Name</label>
                            </div>
                            <div>
                                <Button
                                    id="basic-button"
                                    aria-controls={
                                        open ? "basic-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={handleClick}
                                    className=" text-white"
                                >
                                    Members
                                    <ArrowDropDownTwoTone />
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    className="w-full"
                                    MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                    }}
                                >
                                    {props.friends.map((friend) => (
                                        <MenuItem
                                            onClick={() => addToList(friend)}
                                            className={
                                                users.indexOf(friend.id) !== -1
                                                    ? "bg-gray-700 min-w-200"
                                                    : "min-w-200"
                                            }
                                        >
                                            <strong>{friend.username}</strong>
                                            {users.indexOf(friend.id) !== -1 ? (
                                                <RemoveCircle
                                                    onClick={() =>
                                                        removeFromList(friend)
                                                    }
                                                    className="text-red right-100 text-right text-left text-justify ml-auto"
                                                />
                                            ) : (
                                                ""
                                            )}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                            <button type="submit">
                                <a className="no-underline">Submit</a>
                            </button>
                        </form>
                    </div>
                );
            }, [users, open, anchorEl])}
        </div>
    );
};

export default Form;
