import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DeviceList from "../components/Devices/DeviceList";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { deleteItem, createEntry, fetchUserDevices } from "../util/database";

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

    return <DeviceList devices={devices} deviceHandlers={deviceHandlerObj} />;
};

const styles = StyleSheet.create({
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
