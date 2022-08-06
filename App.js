import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import Home from "./screens/Home";
import UserProfile from "./screens/UserProfile";
import Devices from "./screens/Devices";
import AddDevice from "./screens/AddDevice";

const Stack = createNativeStackNavigator();


export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="UserProfile" component={UserProfile} />
                    <Stack.Screen name="Devices" component={Devices} />
                    <Stack.Screen name="AddDevice" component={AddDevice} />
                </Stack.Navigator>
            </NavigationContainer>
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
