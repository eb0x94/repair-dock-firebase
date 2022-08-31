import { useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";

const SurveyCard = ({ children, onSelect, description }) => {
    let [isSelected, setIsSelected] = useState(false);

    let selectHandler = () => {
        if (isSelected) {
            onSelect(!isSelected);
            setIsSelected(false);
            return;
        }
        onSelect(!isSelected);
        setIsSelected(true);
    };

    // console.log(isSelected ? "selected" : "not selected");

    return (
        <Pressable
            style={({ pressed }) => [
                styles.cardContainer,
                pressed && styles.pressed,
                isSelected && { backgroundColor: "#315a89" },
            ]}
            onPress={() => {
                setIsSelected((prevState) => {
                    onSelect(!prevState);
                    return !prevState;
                });
            }}
        >
            {children}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7,
    },
    cardContainer: {
        height: 150,
        width: "40%",
        backgroundColor: "#82a6d2",
        borderRadius: 20,
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
