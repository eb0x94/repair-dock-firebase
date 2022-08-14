import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DeviceList from "../components/Devices/DeviceList";
import { AuthContext } from "../store/auth-context";
import {
    fetchDataTable,
    deleteItem,
    createEntry,
    fetchUserDevices,
} from "../util/database";

const Devices = ({ route }) => {
    let [devices, setDevices] = useState([]);
    let [isMounted, setIsMounted] = useState(true);
    let [isModifying, setIsModifying] = useState(false);
    let { userId } = route.params;
    useEffect(() => {
        setIsMounted(true);
        let getDevices = async () => {
            let fetchedDevices = await fetchUserDevices(userId);
            if (isMounted) {
                setDevices(fetchedDevices);
            }
        };

        getDevices();
        return () => {
            setIsMounted(false);
            setIsModifying(false);
        };
    }, [isModifying]);

    let createDeviceHandler = (deviceData) => {
        deviceData.ownerId = userId;
        createEntry("devices", deviceData);
        setIsModifying(true);
    };

    let deleteDeviceHandler = (id) => {
        try {
            let deleted = async () => {
                await deleteItem(id, "devices");
            };
            deleted();
            setIsModifying(true);
        } catch (error) {
            console.log(error);
        }
    };

    let deviceHandlerObj = {
        createDevice: createDeviceHandler,
        deleteDevice: deleteDeviceHandler,
    };

    let loading = (
        <View styles={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
        </View>
    );

    return (
        <DeviceList
            devices={devices}
            deviceHandlers={deviceHandlerObj}
            isForRepair={false}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
    },
    loadingContainer: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    loadingText: {
        fontSize: 24,
        fontWeight: "bold",
    },
});

export default Devices;
