import { Pressable, StyleSheet,Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function LogoutIcon({ icon, color, size, onPress }) {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={onPress}
        >
            <MaterialIcons name={icon} color={color} size={size} />
        </Pressable>
    );
}

export default LogoutIcon;

const styles = StyleSheet.create({
    button: {
        margin: 8,
        borderRadius: 20,
    },
    pressed: {
        opacity: 0.7,
    },
});
