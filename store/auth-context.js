import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
    token: "",
    isAuthenticated: false,
    authenticate: (token, userId) => {},
    getUserId: () => {},
    logout: () => {},
});

const AuthContextProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState();
    const [authUserId, setAuthUserId] = useState();

    let authenticate = (token, userId) => {
        setAuthToken(token);
        setAuthUserId(userId);
        AsyncStorage.setItem("token", token);
        if (userId === 0) {
            return;
        }
        AsyncStorage.setItem("userId", userId);
    };

    let getUserId = () => {
        return authUserId;
    };

    let logout = () => {
        setAuthToken(null);
        setAuthUserId(null);
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("userId");
    };

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        getUserId: getUserId,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;
