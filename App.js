import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

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
import LoadingOverlay from "./components/UI/LoadingOverlay";
import LogoutIcon from "./components/UI/LogoutIcon";
import UpdateUserProfile from "./screens/UpdateUserProfile";
import SelectProvider from "./screens/SelectProvider";
import OngoingTickets from "./screens/OngoingTickets";
import RepairHistory from "./screens/RepairHistory";

const Stack = createNativeStackNavigator();

const AuthScreenStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#1068D8" },
                headerTintColor: "white",
                contentStyle: { backgroundColor: "#3f72af" },
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignUpScreen} />
        </Stack.Navigator>
    );
};

const AuthenticatedScreenStack = () => {
    const [isTryingToGetID, setIsTryingToGetID] = useState(true);
    const authCtx = useContext(AuthContext);
    const [loggedUserId, setLoggedUserId] = useState("");
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
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#1068D8" },
                headerTintColor: "white",
                contentStyle: { backgroundColor: "#3f72af" },
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerRight: ({ tintColor }) => (
                        <LogoutIcon
                            icon="logout"
                            size={28}
                            color={tintColor}
                            onPress={authCtx.logout}
                        />
                    ),
                }}
                initialParams={{ userId: loggedUserId }}
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
            <Stack.Screen
                name="UpdateUserProfile"
                component={UpdateUserProfile}
            />
            <Stack.Screen name="SelectProvider" component={SelectProvider} />
            <Stack.Screen
                name="OngoingTickets"
                component={OngoingTickets}
                initialParams={{ userId: loggedUserId }}
            />
            <Stack.Screen
                name="RepairHistory"
                component={RepairHistory}
                initialParams={{ userId: loggedUserId }}
            />
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
            let storedId = await AsyncStorage.getItem("userId");

            if (storedToken !== null && storedId !== null) {
                authCtx.authenticate(storedToken, storedId);
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
            <StatusBar style="light" />
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
