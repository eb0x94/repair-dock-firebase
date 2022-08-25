import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
} from "react-native";
import { UserAction } from "./UserAction";
import { useNavigation } from "@react-navigation/native";

const AccountDetails = ({ profileData }) => {
    let navigation = useNavigation();
    let { fName, lName, email, phoneNumber } = profileData;

    let onActionSelectHadler = (type) => {
        switch (type) {
            case "updatePersonalDetails":
                navigation.navigate("UpdateUserProfile", profileData);
                break;
            default:
                Alert.alert(
                    "Coming soon",
                    "This functionality is still in development. Good things take time."
                );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileInfo}>
                <View style={styles.profileImage}>
                    <Image
                        style={styles.image}
                        source={require("../../assets/images/profile-pic.png")}
                    />
                </View>
                <View style={styles.nameSection}>
                    <Text
                        style={styles.profileNameText}
                    >{`${fName} ${lName}`}</Text>
                    <Text style={styles.profileDetailsText}>{email}</Text>
                    <Text>
                        {phoneNumber ? phoneNumber : "Add number from details"}
                    </Text>
                </View>
            </View>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 29 }}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <UserAction
                        title={"Change personal details"}
                        icon="edit"
                        onPress={onActionSelectHadler.bind(
                            this,
                            "updatePersonalDetails"
                        )}
                    />
                    <UserAction
                        title={"Shipping address"}
                        icon="location-pin"
                        onPress={onActionSelectHadler.bind(
                            this,
                            "updateAddress"
                        )}
                    />
                    <UserAction
                        title={"Orders"}
                        icon="shopping-cart"
                        onPress={onActionSelectHadler.bind(this, "orders")}
                    />
                    <UserAction
                        title={"Notifications"}
                        icon="notifications"
                        onPress={onActionSelectHadler.bind(
                            this,
                            "notifications"
                        )}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileInfo: {
        marginTop: 16,
        paddingHorizontal: 30,
        flexDirection: "row",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 60,
        backgroundColor: "#bcbcbc",
        justifyContent:"center",
        alignItems:"center"
    },
    nameSection: {
        marginLeft: 40,
        justifyContent: "center",
    },
    profileNameText: {
        fontSize: 20,
        fontWeight: "bold",
        justifyContent: "center",
        paddingVertical: 5,
    },
    image: {
        width: "90%",
        height: "90%",
        borderRadius:60,
    },
});

export default AccountDetails;
