import { Avatar, Button, ListItem, ListItemText } from "@material-ui/core";
import IdentifyRequestUseQuery from "core/services/api/AcceptRejectRequest.api";
import GetRequestsUseQuery from "core/services/api/GetRequests.api";
import { showToast } from "core/utils/show-toast";
import React, { useEffect, useState } from "react";
function ShowRequests() {
    const getRequestsQuery = GetRequestsUseQuery();
    const IdentifyRequestQuery = IdentifyRequestUseQuery();
    const [requests, setRequests] = useState([]);

    const getRequests = async () => {
        getRequestsQuery.mutate(
            {},
            {
                onSuccess: (result) => {
                    const reqList = [];
                    result.results.map((res) => {
                        if (res.status === "W") {
                            reqList.push(res);
                        }
                        return reqList;
                    });

                    setRequests(reqList);
                },
                onError: (error) => {
                    console.log(error);
                },
            }
        );
    };
    const statusRequest = (event, id) => {
        let status;
        const innerHtmlBtn = event.target.innerHTML;
        if (innerHtmlBtn === "Accept") {
            status = "A";
        } else if (innerHtmlBtn === "Reject") {
            status = "R";
        }
        IdentifyRequestQuery.mutate(
            { status, id },
            {
                onSuccess: (result) => {
                    showToast(
                        [`You ${innerHtmlBtn}ed the request`],
                        innerHtmlBtn === "Accept" ? "success" : "error"
                    );
                },
                onError: (error) => {
                    console.log(error.response.data);
                    showToast(["something is going wrong"], "error");
                },
            }
        );
    };

    useEffect(() => {
        getRequests();
    }, []);

    //TODO show when request submitted

    return (
        <div className="m-10">
            You have {requests.length} Request{requests.length === 1 ? "" : "s"}
            {requests.map((request) =>
                request.status === "W" ? (
                    <div key={request.id}>
                        <ListItem
                            button
                            className="px-16 py-12 min-h-56 m-10 bg-gray-300"
                            style={{ width: "35%" }}
                        >
                            <ListItemText
                                classes={{
                                    root: "min-w-px",
                                    secondary: "truncate",
                                }}
                                primary={request.sender.username}
                            />
                            <Button
                                onClick={(event) =>
                                    statusRequest(event, request.id)
                                }
                                className="bg-green-dark mr-10"
                            >
                                Accept
                            </Button>
                            <Button
                                onClick={(event) =>
                                    statusRequest(event, request.id)
                                }
                                className="bg-red-dark"
                            >
                                Reject
                            </Button>
                        </ListItem>
                    </div>
                ) : (
                    ""
                )
            )}
        </div>
    );
}

export default ShowRequests;
