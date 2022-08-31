import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
    token: "",
    userId: "",
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
        AsyncStorage.setItem("userId", userId);
    };

    let getUserId = async () => {
        let id = await AsyncStorage.getItem("userId")
            .then((res) => {
                id = res;
            })
            .catch((err) => {
                console.log(err);
            });
        return id;
    };

    let logout = () => {
        setAuthToken(null);
        setAuthUserId(null);
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("userId");
    };

    const value = {
        token: authToken,
        userId: authUserId,
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
