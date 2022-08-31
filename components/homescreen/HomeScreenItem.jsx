import { Pressable, StyleSheet, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreenItem = ({ itemData, onPress }) => {
    const screenType = itemData.type;
    let onPressHandler = () => {
        onPress(screenType);
    };
    return (
        <Pressable
            onPress={onPressHandler}
            style={({ pressed }) => [styles.itemBox, pressed && styles.pressed]}
        >
            <MaterialIcons
                style={styles.icon}
                name={itemData.iconName}
                size={38}
                color="black"
            />
            <View style={styles.infoView}>
                <Text style={styles.titleText}>{itemData.title}</Text>
                <Text style={styles.detailsText}>{itemData.description}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    itemBox: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginVertical: 12,
        padding: 12,
        backgroundColor: "#82a6d2",
        borderRadius: 20,
        maxHeight: 100,
    },
    icon: {
        flex: 1,
        alignSelf: "center",
        paddingLeft: 12,
    },
    infoView: {
        flex: 3,
        padding: 12,
    },
    pressed: {
        opacity: 0.7,
    },
    titleText: {
        fontSize: 22,
    },
    detailsText: {
        fontSize: 14,
    },
});

export default HomeScreenItem;
