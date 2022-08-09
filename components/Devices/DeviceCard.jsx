import { StyleSheet, View, Text } from "react-native";
import Button from "../UI/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DeviceCard = ({ itemDetails, deleteItem, isRepair }) => {
    const navigation = useNavigation();

    let deleteHandler = () => {
        deleteItem(itemDetails.id);
    };

    let repairHandler = () => {
        navigation.navigate("SurveyScreen", { deviceDetails: itemDetails });
    };

    let button = (
        <Button icon="delete" onPress={deleteHandler}>
            Delete
        </Button>
    );

    if (isRepair) {
        button = (
            <Button icon="post-add" onPress={repairHandler}>
                Select device
            </Button>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <MaterialIcons
                    style={styles.icon}
                    name={itemDetails.data.type}
                    size={62}
                    color="black"
                />
                <View style={styles.textView}>
                    <Text style={styles.text}>{itemDetails.data.make}</Text>
                    <Text style={styles.text}>{itemDetails.data.model}</Text>
                </View>
            </View>
            {button}
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
