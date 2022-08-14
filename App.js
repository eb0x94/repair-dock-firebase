import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import Home from "./screens/Home";
import UserProfile from "./screens/UserProfile";
import Devices from "./screens/Devices";
import AddDevice from "./screens/AddDevice";
import RepairBook from "./screens/RepairBook";
import SurveyScreen from "./screens/SurveyScreen";
import LoginScreen from "./screens/Login/LoginScreen";
import SignUpScreen from "./screens/Login/SignUpScreen";
import { useContext, useEffect, useState } from "react";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import AppLoading from "expo-app-loading";
import LoadingOverlay from "./components/UI/LoadingOverlay";
import LogoutIcon from "./components/UI/LogoutIcon";

// SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const AuthScreenStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignUpScreen} />
        </Stack.Navigator>
    );
};

const AuthenticatedScreenStack = () => {
    const [isTryingToGetID, setIsTryingToGetID] = useState(true);
    const [loggedUserId, setLoggedUserId] = useState("");
    const authCtx = useContext(AuthContext);
    try {
        let fetchToken = async () => {
            let storeId = await AsyncStorage.getItem("userId");

            if (storeId !== null) {
                setLoggedUserId(storeId);
            }
            setIsTryingToGetID(false);
        };
        fetchToken();
    } catch (error) {
        console.log(error);
    }

    if (isTryingToGetID) {
        return <LoadingOverlay message="Loading App" />;
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerRight: () => (
                        <LogoutIcon
                            icon="logout"
                            size={24}
                            color="black"
                            onPress={authCtx.logout}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="UserProfile"
                component={UserProfile}
                initialParams={{ userId: loggedUserId }}
            />
            <Stack.Screen
                name="Devices"
                component={Devices}
                initialParams={{ userId: loggedUserId }}
            />
            <Stack.Screen name="AddDevice" component={AddDevice} />
            <Stack.Screen
                name="BookRepair"
                component={RepairBook}
                initialParams={{ userId: loggedUserId }}
            />
            <Stack.Screen name="SurveyScreen" component={SurveyScreen} />
        </Stack.Navigator>
    );
};

const Navigation = () => {
    const authCtx = useContext(AuthContext);
    return (
        <NavigationContainer>
            {!authCtx.isAuthenticated && <AuthScreenStack />}
            {authCtx.isAuthenticated && <AuthenticatedScreenStack />}
        </NavigationContainer>
    );
};

const Root = () => {
    const [isTryingToLogin, setIsTryingToLogin] = useState(true);
    const authCtx = useContext(AuthContext);
    useEffect(() => {
        let fetchToken = async () => {
            let storedToken = await AsyncStorage.getItem("token");

            if (storedToken) {
                authCtx.authenticate(storedToken);
            }
            setIsTryingToLogin(false);
        };
        fetchToken();
    }, []);

    if (isTryingToLogin) {
        return <LoadingOverlay message="Loading App" />;
    }
    return <Navigation />;
};

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <AuthContextProvider>
                <Root />
            </AuthContextProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
