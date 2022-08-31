import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../UI/Button";
import { useNavigation } from "@react-navigation/native";
import Collapsible from "react-native-collapsible";
//db

const DeviceForm = ({ onCreate }) => {
    const navigation = useNavigation();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: "Phone", value: "smartphone" },
        { label: "Tablet", value: "tablet" },
        { label: "Laptop", value: "laptop" },
    ]);
    let [isCollapsed, setIsCollapsed] = useState(true);

    const [inputDetails, setInputDetails] = useState("");

    let inputChangeHandler = (inputIdentifier, enteredValue) => {
        setInputDetails((prevState) => {
            return { ...prevState, [inputIdentifier]: enteredValue };
        });
    };

    //to catch the last character of the input fields
    useEffect(() => {}, [inputDetails]);

    let saveDevice = async () => {
        let deviceToAdd = { ...inputDetails, ...{ type: value } };

        if (!inputDetails.make || !inputDetails.model || !value) {
            Alert.alert(
                "Invalid fields",
                `Please, ${
                    !value
                        ? "select device type."
                        : inputDetails.make
                        ? "enter device model."
                        : "enter device make."
                }`
            );
            return;
        }

        onCreate(deviceToAdd);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <Text style={styles.inputText}>Device Type:</Text>
                <DropDownPicker
                    style={{ borderRadius: 20 }}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Pick device type"
                    onOpen={() => setIsCollapsed((prevState) => !prevState)}
                    onClose={() => setIsCollapsed((prevState) => !prevState)}
                />
                <Collapsible
                    collapsed={isCollapsed}
                    style={{
                        height: 120,
                    }}
                />
            </View>

            <View style={styles.inputView}>
                <Text style={styles.inputText}>Device Make:</Text>
                <TextInput
                    value={inputDetails.brand}
                    style={styles.inputField}
                    placeholder="Type in make"
                    onChangeText={inputChangeHandler.bind(this, "make")}
                />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.inputText}>Device Model:</Text>
                <TextInput
                    value={inputDetails.model}
                    style={styles.inputField}
                    placeholder="Type in model"
                    onChangeText={inputChangeHandler.bind(this, "model")}
                />
            </View>
            <Button onPress={saveDevice}>Save device</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 12,
        marginTop: 100,
    },
    inputView: {
        marginVertical: 10,
    },
    inputText: {
        fontWeight: "bold",
        paddingBottom: 12,
        fontSize: 16,
    },
    inputField: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontSize: 16,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: "white",
    },
});

export default DeviceForm;
