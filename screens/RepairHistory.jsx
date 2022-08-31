import { StyleSheet, Text, View } from "react-native";

const RepairHistory = () => {
    return (
        <View style={styles.container}>
            <Text>Closed tickets</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default RepairHistory;
