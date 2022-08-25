import { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import DeviceList from "../components/Devices/DeviceList";
import { AuthContext } from "../store/auth-context";

//db import
import { fetchUserDevices } from "../util/database";

const RepairBook = ({ route }) => {
    const { userId } = route.params;
    const [devices, setDevices] = useState([]);
    const [isMounted, setIsMounted] = useState(true);
    const authCtx = useContext(AuthContext);

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
        };
    }, []);

    return <DeviceList devices={devices} isForRepair />;
};

const styles = StyleSheet.create({});

export default RepairBook;
