import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Button = ({ onPress, children, icon }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
            <MaterialIcons name={icon} size={24} color="white" />
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        backgroundColor: "blue",
        elevation: 2,
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    pressed: { opacity: 0.5 },
    text: {
        textAlign: "center",
        padding: 6,
        fontSize: 18,
        color: "lightblue",
    },
});

export default Button;
