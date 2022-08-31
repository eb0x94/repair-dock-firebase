import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
} from "react-native";
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

        const isFirstNameValid = firstName.length > 0;
        const isLastNameValid = lastName.length > 0;
        const isValidEmail = email.includes("@");
        const isPasswordValid = password.length > 6;
        const arePasswordsEqual = password === confirmPassword;

        if (
            (!isLogin && !arePasswordsEqual) ||
            !isValidEmail ||
            !isPasswordValid ||
            (!isLogin && !isFirstNameValid) ||
            (!isLogin && !isLastNameValid)
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
            return;
        }

        onAuthenticate(credentials);
    };

    let createLoginText = (
        <Text style={styles.createLoginText}>
            {isLogin ? "New to RepairDock?" : "Already have an account?"}
        </Text>
    );

    return (
        
            <View style={styles.authContent}>
                <AuthForm
                    onSubmit={submitHandler}
                    isLogin={isLogin}
                    invalidCredentials={invalidCredentials}
                />
                <View style={styles.buttons}>
                    {createLoginText}
                    <FlatButton onPress={switchAuthModeHandler}>
                        {isLogin ? "Create an account" : "Log in instead"}
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
    createLoginText: {
        textAlign: "center",
        color: "white",
    },
});

export default AuthContent;
