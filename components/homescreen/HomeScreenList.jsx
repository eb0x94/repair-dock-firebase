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
                break;
            case "historyRepair":
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
