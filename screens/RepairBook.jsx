import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import DeviceList from "../components/Devices/DeviceList";

//db import
import { fetchDataTable } from "../util/database";

const RepairBook = () => {
    const [devices, setDevices] = useState([]);
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        setIsMounted(true);
        let getDevices = async () => {
            let fetchedDevices = await fetchDataTable("devices");
            if (isMounted) {
                setDevices(fetchedDevices);
            }
        };

        getDevices();
        return () => {
            setIsMounted(false);
        };
    }, []);

    return <DeviceList devices={devices} isForRepair={true} />;
};

const styles = StyleSheet.create({});

export default RepairBook;
