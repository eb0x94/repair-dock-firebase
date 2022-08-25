import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const UserAction = ({ icon, title, onPress }) => {

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.actionContainer}>
                <View style={styles.actionItems}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name={icon} size={28} />
                    </View>
                    <Text style={styles.actionText}>{title}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color="black" />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    actionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 29,
        marginTop: 29,
    },
    iconContainer: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        backgroundColor: "lightblue",
    },
    actionText: {
        fontSize: 16,
        marginLeft: 20,
    },
    actionItems: {
        flexDirection: "row",
        alignItems: "center",
    },
    pressed: {
        opacity: 0.7,
    },
});

export default UserAction;
