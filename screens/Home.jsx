import { useState } from "react";
import { StyleSheet } from "react-native";
import HomeScreenList from "../components/homescreen/HomeScreenList";
import { MENU_ITEMS, MENU_ITEMS_ADMIN } from "../constants/homescreen/items";
import { fetchDataWithID } from "../util/database";

const Home = ({ route }) => {
    let { userId } = route.params;
    
    let [isAdmin, setIsAdmin] = useState(false);

    fetchDataWithID(userId, "/users")
        .then((res) => setIsAdmin(res.isAdmin))
        .catch((err) => console.log(err));

    return (
        <HomeScreenList
            style={styles.container}
            isAdmin={false}
            homeItems={isAdmin ? MENU_ITEMS_ADMIN : MENU_ITEMS}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Home;
