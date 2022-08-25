import { StyleSheet } from "react-native";
import HomeScreenList from '../components/homescreen/HomeScreenList'
import { MENU_ITEMS, MENU_ITEMS_ADMIN } from "../constants/homescreen/items";

const Home = () => {
    return <HomeScreenList style={styles.container} homeItems={MENU_ITEMS} />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Home;
