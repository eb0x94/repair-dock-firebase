import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, Text, LogBox } from "react-native";

const Rating = ({ ratingValue }) => {
    LogBox.ignoreLogs(["Warning: Each child in a list should have a unique"]);
    const stars = [];

    for (let i = 0; i < 5; i++) {
        let starName = i < ratingValue ? "star-rate" : "star-outline";

        stars.push(
            <View>
                <MaterialIcons name={starName} size={18} color="black" />
            </View>
        );
    }

    return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Rating;
