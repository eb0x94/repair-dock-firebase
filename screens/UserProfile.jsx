import { StyleSheet, Text, View } from "react-native";

const UserProfile = () => {
    return (
        <View style={styles.container}>
            <Text>This is user profile</Text>
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

export default UserProfile;
