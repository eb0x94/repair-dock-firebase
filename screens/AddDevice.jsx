import { StyleSheet } from "react-native";
import DeviceForm from "../components/Devices/DeviceForm";

import { LogBox } from "react-native";

const AddDevice = ({ route, navigation }) => {
    LogBox.ignoreLogs([
        "Non-serializable values were found in the navigation state",
    ]);
    let onCreateHandler = (deviceData) => {
        route.params.create(deviceData);
        navigation.goBack();
    };

    return <DeviceForm onCreate={onCreateHandler} />;
};

const styles = StyleSheet.create({});

export default AddDevice;
