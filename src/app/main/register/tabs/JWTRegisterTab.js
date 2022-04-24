import React, { useEffect, useRef, useState } from "react";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "@fuse";
import { Button, InputAdornment, Icon } from "@material-ui/core";
import { useSelector } from "react-redux";
import RegisterUseQuery from "core/services/api/Register.api";
import { showToast } from "core/utils/show-toast";
import { useHistory } from "react-router-dom";

function JWTRegisterTab(props) {
    const register = useSelector(({ auth }) => auth.register);
    const registerQuery = RegisterUseQuery();
    const [isFormValid, setIsFormValid] = useState(false);
    const [userNameTaken, setUserNameTaken] = useState(false);
    const formRef = useRef(null);

    let errorForUsernameTaken = null;
    let history = useHistory();
    useEffect(() => {
        if (
            register.error &&
            (register.error.username ||
                register.error.password ||
                register.error.email)
        ) {
            formRef.current.updateInputsWithError({
                ...register.error,
            });
            disableButton();
        }
    }, [register.error]);

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    function handleSubmit(model) {
        console.log(model)
        registerQuery.mutate(
            {
                username: model.username,
                password: model.password,
                email: model.email,
                phone_number: model.phoneNumber,
            },
            {
                onSuccess: (result) => {
                    console.log(result)
                    showToast(["New member added"], "success");
                    localStorage.setItem("token", result.data.data.token);
                    history.push("/apps/chat");
                },
                onError: (error) => {
                    if (
                        error.response.data.message === "Username already taken"
                    ) {
                        setUserNameTaken(true);
                    }
                },
            }
        );
    }
    if (userNameTaken) {
        errorForUsernameTaken = "Username already taken";
    }

    return (
        <div className="w-full">
            {userNameTaken && errorForUsernameTaken}
            <Formsy
                onValidSubmit={handleSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className="flex flex-col justify-center w-full"
            >
                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="username"
                    label="Username"
                    validations={{
                        minLength: 4,
                    }}
                    validationErrors={{
                        minLength: "Min character length is 4",
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Icon className="text-20" color="action">
                                    person
                                </Icon>
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    required
                />

                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="email"
                    label="Email"
                    validations="isEmail"
                    validationErrors={{
                        isEmail: "Please enter a valid email",
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Icon className="text-20" color="action">
                                    email
                                </Icon>
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    required
                />

                <TextFieldFormsy
                    className="mb-16"
                    type="tel"
                    name="phoneNumber"
                    label="Phone Number"
                    validations={{
                        isNumeric: true,
                        isLength: 11,
                    }}
                    validationErrors={{
                        isNumeric: "Please enter a valid phone number",
                        isLength: "Phone Number should contain 11 numbers",
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Icon className="text-20" color="action">
                                    phonenumber
                                </Icon>
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    required
                />

                <TextFieldFormsy
                    className="mb-16"
                    type="password"
                    name="password"
                    label="Password"
                    validations="equalsField:password-confirm"
                    validationErrors={{
                        equalsField: "Passwords do not match",
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Icon className="text-20" color="action">
                                    vpn_key
                                </Icon>
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    required
                />

                <TextFieldFormsy
                    className="mb-16"
                    type="password"
                    name="password-confirm"
                    label="Confirm Password"
                    validations="equalsField:password"
                    validationErrors={{
                        equalsField: "Passwords do not match",
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Icon className="text-20" color="action">
                                    vpn_key
                                </Icon>
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full mx-auto mt-16 normal-case"
                    aria-label="REGISTER"
                    disabled={!isFormValid}
                    value="legacy"
                >
                    Register
                </Button>
            </Formsy>
        </div>
    );
}

export default JWTRegisterTab;
