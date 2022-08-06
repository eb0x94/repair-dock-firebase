import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import Button from "../UI/Button";

import DeviceCard from "./DeviceCard";

const DeviceList = ({ devices, deviceHandlers }) => {
    let content = (
        <Text style={[styles.infoText]}>You don't have any devices.</Text>
    );

    const navigation = useNavigation();

    let navigationHandler = () => {
        navigation.navigate("AddDevice", {
            create: deviceHandlers.createDevice,
        });
    };

    let deleteDevice = (deviceID) => {
        deviceHandlers.deleteDevice(deviceID);
    };

    if (devices.length > 0) {
        content = (
            <FlatList
                style={styles.container}
                data={devices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <DeviceCard deleteItem={deleteDevice} itemDetails={item} />
                )}
            />
        );
    }
    return (
        <>
            {content}
            <View style={styles.button}>
                <Button onPress={navigationHandler} icon="add">
                    Add new device
                </Button>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 6,
        padding: 12,
    },
    button: {
        marginHorizontal: 12,
        marginBottom: 24,
    },
    infoText: {
        color: "black",
        fontSize: 20,
        textAlign: "center",
        marginTop: "70%",
        marginBottom: 20,
    },
});

export default DeviceList;
