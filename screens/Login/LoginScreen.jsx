import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { useState, useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { loginUser } from "../../util/auth";
import { Alert } from "react-native";

const LoginScreen = () => {
    let [isAuthenticating, setIsAuthenticating] = useState(false);
    const authCtx = useContext(AuthContext);

    let loginHandler = async ({ email, password }) => {
        setIsAuthenticating(true);
        try {
            const returnedData = await loginUser(email, password);
            authCtx.authenticate(returnedData.token, returnedData.userId);
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data.error.message === "EMAIL_NOT_FOUND") {
                Alert.alert(
                    "Invalid credentials",
                    "Account does't exists. Please, create an account."
                );
            }
            if (error.response.data.error.message === "INVALID_PASSWORD") {
                Alert.alert(
                    "Invalid password",
                    "Please, enter correct password"
                );
            }
            if (error.response.data.error.message === "INVALID_EMAIL") {
                Alert.alert(
                    "Invalid email",
                    "Please, enter correct email."
                );
            }

            setIsAuthenticating(false);
        }
    };

    if (isAuthenticating) {
        return <LoadingOverlay message="Logging in..." />;
    }

    return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default LoginScreen;
