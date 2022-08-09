import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import FlatButton from "../UI/FlatButton";

import AuthForm from "./AuthForm";

const AuthContent = ({ isLogin, onAuthenticate }) => {
    const navigation = useNavigation();

    const [invalidCredentials, setInvalidCredentials] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const switchAuthModeHandler = () => {
        if (isLogin) {
            navigation.replace("Signup");
        } else {
            navigation.replace("Login");
        }
    };

    const submitHandler = (credentials) => {
        let { firstName, lastName, email, password, confirmPassword } =
            credentials;

        firstName.trim();
        lastName.trim();
        email.trim();
        password.trim();

        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(password);

        const isFirstNameValid = firstName.length > 0;
        const isLastNameValid = lastName.length > 0;
        const isValidEmail = email.includes("@");
        const isPasswordValid = password.length > 6;
        const arePasswordsEqual = password === confirmPassword;

        if(!isLogin)

        console.log(isFirstNameValid);
        console.log(isLastNameValid);

        if (
            !isValidEmail ||
            !isPasswordValid ||
            !isFirstNameValid ||
            !isLastNameValid ||
            (!isLogin && !arePasswordsEqual)
        ) {
            Alert.alert(
                "Oops...Wrong info entered",
                "Please,check you credentials"
            );
            setInvalidCredentials({
                firstName: !isFirstNameValid,
                lastName: !isLastNameValid,
                email: !isValidEmail,
                password: !isPasswordValid,
                confirmPassword: !isPasswordValid || !arePasswordsEqual,
            });
            console.log("invalid");
            return;
        }

        onAuthenticate({ email, password });
        console.log("valid");
    };

    return (
        <View style={styles.authContent}>
            <AuthForm
                onSubmit={submitHandler}
                isLogin={isLogin}
                invalidCredentials={invalidCredentials}
            />
            <View style={styles.buttons}>
                <FlatButton onPress={switchAuthModeHandler}>
                    {isLogin ? "Create new user" : "Log in instead"}
                </FlatButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttons: {
        marginTop: 8,
    },
    authContent: {
        marginTop: 64,
        marginHorizontal: 32,
        padding: 16,
        borderRadius: 8,
        backgroundColor: "#315a89",
        elevation: 6,
        shadowColor: "black",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
    },
});

export default AuthContent;
