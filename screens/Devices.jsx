import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import DeviceList from "../components/Devices/DeviceList";
import { DEVICES, DEVICES_EMPTY } from "../constants/homescreen/items";
import { fetchDevices, createDevice, deleteDevice } from "../util/database";

const Devices = () => {
    let [devices, setDevices] = useState([]);

    useEffect(() => {
        try {
            let getDevices = async () => {
                let fetchedDevices = await fetchDevices();
                setDevices(fetchedDevices);
            };
            getDevices();
        } catch (error) {
            console.log(error);
        }
    }, [devices]);

    let createDeviceHandler = (deviceData) => {
        createDevice(deviceData);
    };

    let deleteDeviceHandler = (id) => {};

    let deviceHandlerObj = {
        createDevice: createDeviceHandler,
        deleteDevice: deleteDeviceHandler,
    };

    return <DeviceList devices={devices} deviceHandlers={deviceHandlerObj} />;
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
    },
});

export default Devices;
