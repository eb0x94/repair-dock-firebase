import { StyleSheet, FlatList } from "react-native";
import HomeScreenItem from "./HomeScreenItem";
import { useNavigation } from "@react-navigation/native";

const HomeScreenList = ({ homeItems }) => {
    const navigation = useNavigation();

    let itemPressHandler = (screenType) => {
        switch (screenType) {
            case "profile":
                navigation.navigate("UserProfile");
                break;
            case "devices":
                navigation.navigate("Devices");
                break;
            case "bookRepair":
                navigation.navigate("BookRepair");
                break;
            case "currentRepairs":
                navigation.navigate("OngoingTickets", { isAdmin: false });
                break;
            case "currentRepairsAdmin":
                navigation.navigate("OngoingTickets", { isAdmin: true });
                break;
            case "historyRepair":
                navigation.navigate("RepairHistory", { isAdmin: false });
                break;
            case "historyRepairAdmin":
                navigation.navigate("RepairHistory", { isAdmin: true });
                break;
            default:
        }
    };

    return (
        <FlatList
            scrollEnabled={false}
            style={styles.list}
            data={homeItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <HomeScreenItem itemData={item} onPress={itemPressHandler} />
            )}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        margin: 24,
    },
});

export default HomeScreenList;
