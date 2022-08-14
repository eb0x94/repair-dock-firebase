import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { useState, useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { loginUser } from "../../util/auth";

const LoginScreen = () => {
    let [isAuthenticating, setIsAuthenticating] = useState(false);
    const authCtx = useContext(AuthContext);

    let loginHandler = async ({ email, password }) => {
        setIsAuthenticating(true);
        try {
            const returnedData = await loginUser(email, password);
            authCtx.authenticate(returnedData.token, returnedData.userId);
        } catch (error) {
            Alert.alert(
                "Athentication Failed",
                "Could not log you in. Please, try again later!"
            );
            setIsAuthenticating(false);
        }
    };

    if (isAuthenticating) {
        return <LoadingOverlay message="Logging in..." />;
    }

    return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default LoginScreen;
