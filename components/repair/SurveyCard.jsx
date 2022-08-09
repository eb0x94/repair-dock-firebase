import { Pressable, StyleSheet, TouchableOpacity } from "react-native";

const SurveyCard = ({ children, onPress }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.cardContainer,
                pressed && styles.pressed,
            ]}
            onPress={onPress}
        >
            {children}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.5,
    },
    cardContainer: {
        height: 100,
        width: 120,
        backgroundColor: "#82a6d2",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "rgba(0,0,0, .4)",
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        margin: 10
    },
});

export default SurveyCard;
