import { StyleSheet, View, Text } from "react-native";
import Button from "../UI/Button";
import { MaterialIcons } from "@expo/vector-icons";

const DeviceCard = ({ itemDetails, deleteItem }) => {
    let deleteHandler = () => {
        deleteItem(itemDetails.id);
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <MaterialIcons
                    style={styles.icon}
                    name={itemDetails.type}
                    size={62}
                    color="black"
                />
                <View style={styles.textView}>
                    <Text style={styles.text}>{itemDetails.make}</Text>
                    <Text style={styles.text}>{itemDetails.model}</Text>
                </View>
            </View>
            <Button icon="delete" onPress={deleteHandler}>
                Delete
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "lightblue",
        borderRadius: 6,
        margin: 14,
    },
    textContainer: {
        flexDirection: "row",
    },
    textView: {
        flex: 4,
        justifyContent: "center",
    },
    icon: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 48,
        padding: 12,
    },
    text: {
        fontSize: 20,
        padding: 4,
    },
});

export default DeviceCard;
