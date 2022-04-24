import React, { useState } from "react";
import {
    IconButton,
    TextField,
    AppBar,
    Icon,
    Toolbar,
    Typography,
    Avatar,
} from "@material-ui/core";
import { FuseScrollbars } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";
import { useForm, useDebounce, useUpdateEffect } from "@fuse/hooks";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Button from "@material-ui/core/Button";
import EditProfileUseQuery from "../../../../core/services/api/EditProfile.api";
import { showToast } from "core/utils/show-toast";
import GetUserTemporaryLinkUseQuery from "core/services/api/GetUserTemporaryLink.api";
import GetUserSlugUseQuery from "core/services/api/GetUserSlug.api";
import ResetSlugUseQuery from "core/services/api/ResetSlug.api";

const useStyles = makeStyles((theme) => ({
    input: {
        display: "none",
    },
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "95%",
        },
    },
    textField: {
        marginTop: "15px",
    },
    doneBtn: {
        width: "48px",
        height: "48px",
        color: "#8774e1",
        position: "absolute",
        right: "45%",
        cursor: "pointer",
    },
}));

function UserSidebar(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user.data);
    const editUser = EditProfileUseQuery();
    const [temporaryLink, setTemporaryLink] = useState("");
    const [slug, setSlug] = useState("");
    const getUserTemporaryLinkQuery = GetUserTemporaryLinkUseQuery();
    const getUserSlugQuery = GetUserSlugUseQuery();
    const resetUserSlugQuery = ResetSlugUseQuery();
    const { form, handleChange } = useForm(user ? { ...user } : false);

    const getUserTempLink = async () => {
        getUserTemporaryLinkQuery.mutate(
            {},
            {
                onSuccess: (result) => {
                    console.log(result);
                    setTemporaryLink(result);
                },
                onError: (error) => {
                    console.log(error.response.data);
                },
            }
        );
    };

    const getUserSlug = async () => {
        getUserSlugQuery.mutate(
            {},
            {
                onSuccess: (result) => {
                    setSlug(result);
                },
                onError: (error) => {
                    console.log(error.data);
                },
            }
        );
    };
    const resetSlug = () => {
        resetUserSlugQuery.mutate(
            {},
            {
                onSuccess: (result) => {
                    setSlug(result);
                },
                onError: (error) => {
                    console.log(error.response.data);
                },
            }
        );
    };
    const handleEditProfile = (user) => {
        editUser.mutate({
            username: user.target[3].value,
            email: user.target[4].value,
            password: user.target[5].value,
        });
        // console.log(user.target[0].value); // mood
        // console.log(user.target[1].value); // name
        // console.log(user.target[2].value); // lastname
        // console.log(user.target[3].value); // username
        // console.log(user.target[4].value); // email
        // console.log(user.target[5].value); // password
    };
    const copyToClipboard = async (e) => {
        navigator.clipboard.writeText(e.target.innerHTML);
        showToast(["Link Coppied"], "success");
    };
    const updateUserData = useDebounce((form) => {
        dispatch(Actions.updateUserData(form));
    }, 500);

    useUpdateEffect(() => {
        updateUserData(form);
    }, [form, updateUserData]);

    if (!form) {
        return null;
    }

    return (
        <div className="flex flex-col flex-auto h-full">
            <AppBar position="static" color="primary" elevation={1}>
                <Toolbar className="flex justify-between items-center px-16 pr-4">
                    <Typography color="inherit" variant="subtitle1">
                        User Info
                    </Typography>
                    <IconButton
                        onClick={() => dispatch(Actions.closeUserSidebar())}
                        color="inherit"
                    >
                        <Icon>close</Icon>
                    </IconButton>
                </Toolbar>
                <Toolbar className="flex flex-col justify-center items-center p-24">
                    {/* <Avatar
                        src=''
                        alt={user.displayName}
                        className="w-96 h-96"
                    >
                        {!user.avatar || user.avatar === "" ? user.displayName[0] : ""}
                    </Avatar> */}
                    <div className={classes.root}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button
                                className="mt-5 bg-purple-dark"
                                variant="contained"
                                color="secondary"
                                component="span"
                            >
                                Upload
                            </Button>
                        </label>
                    </div>
                    <Typography color="inherit" className="mt-16" variant="h6">
                        {user.displayName}
                    </Typography>
                </Toolbar>
            </AppBar>
            <FuseScrollbars className="overflow-y-auto flex-1 p-24">
                <Button
                    className="mt-5 block m-auto bg-blue"
                    variant="contained"
                    color="secondary"
                    onClick={getUserTempLink}
                >
                    Temporary Friends Link
                </Button>
                {temporaryLink && (
                    <div>
                        <Typography
                            color="inherit"
                            className="mt-16"
                            variant="h6"
                        >
                            Your Temporary Link is:
                        </Typography>
                        <Typography variant="caption" className="block">
                            click to copy
                        </Typography>
                        <Typography
                            color="secondary"
                            className="mt-16 overflow-wrapbw"
                            variant="p"
                            onClick={(e) => copyToClipboard(e)}
                        >
                            {temporaryLink}
                        </Typography>
                    </div>
                )}
                <div className="justify-around flex">
                    <Button
                        className="mt-5 bg-blue"
                        variant="contained"
                        color="secondary"
                        onClick={getUserSlug}
                    >
                        Main Link
                    </Button>
                    <Button
                        className="mt-5 bg-red-dark pull-right"
                        variant="contained"
                        color="secondary"
                        onClick={resetSlug}
                    >
                        Reset Link
                    </Button>
                </div>
                {slug && (
                    <div>
                        <Typography
                            color="inherit"
                            className="mt-16"
                            variant="h6"
                        >
                            Your Main Link is:
                        </Typography>
                        <Typography variant="caption" className="block">
                            click to copy
                        </Typography>
                        <Typography
                            color="secondary"
                            className="mt-16 overflow-wrapbw"
                            variant="p"
                            id="slug-link"
                            onClick={(e) => copyToClipboard(e)}
                        >
                            {slug}
                        </Typography>
                    </div>
                )}
                <form onSubmit={handleEditProfile}>
                    {/* <FormControl
            component="fieldset"
            className="w-full mb-16"
            onSubmit={handleEditProfile}
          > */}
                    <TextField
                        label="Mood"
                        name="mood"
                        className="w-full"
                        value={form.mood}
                        margin="normal"
                        multiline
                        onChange={handleChange}
                    />
                    {/* </FormControl> */}
                    {/* <form className={classes.root} noValidate autoComplete="off"> */}
                    <div className={classes.root}>
                        <TextField
                            className={classes.textField}
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            defaultValue="John"
                        />
                        <TextField
                            className={classes.textField}
                            id="outlined-basic"
                            label="Last Name"
                            variant="outlined"
                            defaultValue="Doe"
                        />
                        <TextField
                            className={classes.textField}
                            id="outlined-basic"
                            label="Username"
                            variant="outlined"
                            defaultValue="@JohnDoe"
                        />
                        <TextField
                            className={classes.textField}
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            defaultValue="JohnDoe@gmail.com"
                            type="email"
                        />
                        <TextField
                            className={classes.textField}
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            type="password"
                        />
                        {/* </form> */}
                        <button type="submit">
                            <CheckCircleIcon
                                className={classes.doneBtn}
                                onClick={() => {
                                    dispatch(Actions.closeUserSidebar());
                                }}
                            />
                        </button>
                    </div>
                </form>
            </FuseScrollbars>
        </div>
    );
}

export default UserSidebar;
