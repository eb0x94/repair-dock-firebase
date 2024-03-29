import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";
import { createUser } from "../../util/auth";
import { createDBUser } from "../../util/database";

const SignUpScreen = () => {
    let [isAuthenticating, setIsAuthenticating] = useState(false);
    const authCtx = useContext(AuthContext);

    let signUpHandler = async ({ firstName, lastName, email, password }) => {
        setIsAuthenticating(true);

        try {
            const returnData = await createUser(email, password);
            let userForDb = {
                fName: firstName,
                lName: lastName,
                email: email,
                phoneNumber: "No phone number",
                address: "No address",
                isAdmin: false,
            };

            const dbId = await createDBUser(
                "users",
                returnData.userId,
                userForDb
            );

            authCtx.authenticate(returnData.token, returnData.userId);
        } catch (error) {
            if (error.response.data.error.message === "EMAIL_EXISTS") {
                Alert.alert(
                    "Creating an account failed",
                    "There is an existing account under the entered e-mail address."
                );
                setIsAuthenticating(false);
                return;
            }
            Alert.alert(
                "Authentication failed",
                "Couldn't create user, please try again later."
            );
            setIsAuthenticating(false);
        }
    };

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating user..." />;
    }

    return <AuthContent onAuthenticate={signUpHandler} />;
};

export default SignUpScreen;
