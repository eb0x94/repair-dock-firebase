import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FlatList, StyleSheet, View, Text, Alert } from "react-native";
import Button from "../UI/Button";

import DeviceCard from "./DeviceCard";

const DeviceList = ({ devices, deviceHandlers, isForRepair }) => {
    const navigation = useNavigation();

    let navigationHandler = () => {
        navigation.navigate("AddDevice", {
            create: deviceHandlers.createDevice,
        });
    };

    let deleteDevice = (deviceID) => {
        Alert.alert("Are you sure?", "You are about to delete this device.", [
            { text: "No", style: "cancel" },
            {
                text: "Yes",
                onPress: () => {
                    deviceHandlers.deleteDevice(deviceID);
                },
            },
        ]);
    };

    let button = (
        <View style={styles.button}>
            <Button onPress={navigationHandler} icon="add">
                Add new device
            </Button>
        </View>
    );

    let content = (
        <>
            <Text style={[styles.infoText]}>
                {isForRepair
                    ? `You don't have any devices\nGo back and add your first device`
                    : "You don't have any devices"}
            </Text>
        </>
    );

    if (devices.length > 0) {
        content = (
            <FlatList
                style={styles.container}
                data={devices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <DeviceCard
                        deleteItem={deleteDevice}
                        itemDetails={item}
                        isRepair={isForRepair}
                    />
                )}
            />
        );
    }

    return (
        <>
            {content}
            {!isForRepair ? button : <View></View>}
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
        color: "white",
        fontSize: 20,
        textAlign: "center",
        marginTop: "70%",
        marginBottom: 20,
    },
});

export default DeviceList;
