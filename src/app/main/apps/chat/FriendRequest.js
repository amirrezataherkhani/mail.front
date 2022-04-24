import { Avatar, Button, ListItem, ListItemText } from "@material-ui/core";
import FindUserUseQuery from "core/services/api/GetUser.api";
import SendRequestUseQuery from "core/services/api/SendRequest.api";
import { showToast } from "core/utils/show-toast";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import GetUserDataUseQuery from "core/services/api/GetUserData.api";

function FriendRequest() {
    const params = useParams();
    const [targetUsername, setTargetUsername] = useState("");
    const [me, setMe] = useState("");
    const [sent, setSent] = useState(false);
    const sendRequestQuery = SendRequestUseQuery();
    const findUserQuery = FindUserUseQuery();
    const getUserDataQuery = GetUserDataUseQuery();
    let history = useHistory();
    let profilePicture;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getUsername(params.slug);
            myInfo();
        } else {
            history.push("/login/");
        }
    }, [params.slug]);

    const myInfo = async () => {
        getUserDataQuery.mutate(
            {},
            {
                onSuccess: (result) => {
                    setMe(result.data.username);
                },
                onError: (error) => {
                    console.log(error);
                },
            }
        );
    };

    const getUsername = async (slug) => {
        findUserQuery.mutate(
            {
                slug,
            },
            {
                onSuccess: (result) => {
                    profilePicture = result.profilePic;
                    setTargetUsername(result.username);
                },
                onError: (error) => {
                    console.log(error);
                },
            }
        );
    };

    const sendRequest = async (slug) => {
        const token = localStorage.getItem("token");
        if (token && !sent && me !== targetUsername) {
            sendRequestQuery.mutate(
                { slug },
                {
                    onSuccess: (result) => {
                        showToast(
                            [`Request sent to ${targetUsername} sucessfully`],
                            "success"
                        );
                        setSent(true);
                    },
                    onError: (error) => {
                        console.log(error.response.data);
                    },
                }
            );
        } else if (me === targetUsername) {
            showToast([`Action not allowed`], "warning");
        } else {
            showToast([`You already requested on this user`], "warning");
        }
    };
    let innerBtnText;
    if (sent) {
        innerBtnText = "REQUEST SENT";
    } else {
        innerBtnText = "SEND REQUEST";
    }
    return (
        <div>
            <Button
                onClick={() => history.push("/")}
                className="m-10 text-white"
                style={{ backgroundColor: "#303030" }}
            >
                Return to Chat page
            </Button>

            <ListItem
                button
                className="px-16 py-12 min-h-92 m-10 bg-gray-300"
                style={{ width: "35%" }}
            >
                <div className="relative mr-16">
                    <Avatar src={profilePicture} alt={targetUsername}>
                        {!profilePicture || profilePicture === ""
                            ? targetUsername[0]
                            : ""}
                    </Avatar>
                </div>

                <ListItemText
                    classes={{
                        root: "min-w-px",
                        secondary: "truncate",
                    }}
                    primary={targetUsername}
                />
                <Button
                    onClick={() => sendRequest(params.slug)}
                    style={{ backgroundColor: sent ? "#aaaaaa" : "#3c4252" }}
                    className="text-white"
                >
                    {innerBtnText}
                </Button>
            </ListItem>
        </div>
    );
}

export default FriendRequest;
