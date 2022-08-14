import { useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";

const SurveyCard = ({ children, onPress, description }) => {
    let [isSelected, setIsSelected] = useState(false);

    let selectHanlder = () => {
        if (isSelected) {
            setIsSelected(false);
            return;
        }
        setIsSelected(true);
    };

    return (
        <Pressable
            style={({ pressed }) => [
                styles.cardContainer,
                pressed && styles.pressed,
                isSelected && { backgroundColor: "#3172af" },
            ]}
            onPress={selectHanlder}
        >
            {children}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.5,
        backgroundColor: "#315a89",
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
        margin: 10,
    },
});

export default SurveyCard;
