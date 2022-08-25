import { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import FlatButton from "../UI/FlatButton";

const AuthForm = ({ onSubmit, invalidCredentials, isLogin }) => {
    const [enteredFirstName, setEnteredFirstName] = useState("");
    const [enteredLastName, setEnteredLastName] = useState("");
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

    const {
        firstName: firstNameIsInvalid,
        lastName: lastNameIsInvalid,
        email: emailIsInvalid,
        password: passwordIsInvalid,
        confirmPassword: passwordsDontMatch,
    } = invalidCredentials;

    let inputUpdateHandler = (inputType, enteredValue) => {
        switch (inputType) {
            case "firstName":
                setEnteredFirstName(enteredValue);
                break;
            case "lastName":
                setEnteredLastName(enteredValue);
                break;
            case "email":
                setEnteredEmail(enteredValue);
                break;
            case "password":
                setEnteredPassword(enteredValue);
                break;
            case "confirmPassword":
                setEnteredConfirmPassword(enteredValue);
                break;
        }
    };

    const submitHandler = () => {
        onSubmit({
            firstName: enteredFirstName,
            lastName: enteredLastName,
            email: enteredEmail.toLowerCase(),
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
        });
    };

    return (
        <View>
            {isLogin && (
                <Image
                    style={styles.loginImage}
                    source={require("../../assets/images/repair-dock-login.png")}
                />
            )}
            <View>
                {!isLogin && (
                    <Input
                        label="First name"
                        value={enteredFirstName}
                        onUpdateValue={inputUpdateHandler.bind(
                            this,
                            "firstName"
                        )}
                        isInvalid={firstNameIsInvalid}
                    />
                )}
                {!isLogin && (
                    <Input
                        label="Last name"
                        value={enteredLastName}
                        onUpdateValue={inputUpdateHandler.bind(
                            this,
                            "lastName"
                        )}
                        isInvalid={lastNameIsInvalid}
                    />
                )}
                <Input
                    label="E-mail address"
                    value={enteredEmail}
                    onUpdateValue={inputUpdateHandler.bind(this, "email")}
                    isInvalid={emailIsInvalid}
                />
                <Input
                    label="Password"
                    value={enteredPassword}
                    secure
                    onUpdateValue={inputUpdateHandler.bind(this, "password")}
                    isInvalid={passwordIsInvalid}
                />
                {!isLogin && (
                    <Input
                        label="Confirm password"
                        value={enteredConfirmPassword}
                        secure
                        onUpdateValue={inputUpdateHandler.bind(
                            this,
                            "confirmPassword"
                        )}
                        isInvalid={passwordsDontMatch}
                    />
                )}
            </View>
            <View>
                <FlatButton>
                    Forgotten password?
                </FlatButton>
            </View>
            <View style={styles.buttons}>
                <Button onPress={submitHandler}>
                    {isLogin ? "Log in" : "Sign Up"}
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttons: {
        marginTop: 12,
    },
    loginImage: {
        height: 100,
        width: "100%",
        borderRadius: 6,
    },
});

export default AuthForm;
