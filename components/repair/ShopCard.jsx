import { StyleSheet, View, Text, LogBox, Image } from "react-native";
import Button from "../UI/Button";
import Rating from "../UI/Rating";

const ShopCard = ({ price, shopDetails, shopId, onSelectedShop }) => {
    LogBox.ignoreLogs(["Warning: Each child in a list should have a unique"]);
    const { fName, lName, address, rating, shopPicture } = shopDetails;

    let onSelectHandler = () => {
        onSelectedShop(shopId);
    };

    return (
        <View style={styles.cardContainer}>
            <View style={styles.shopDetailsContainer}>
                <View style={styles.profileImage}>
                    <Image
                        style={styles.image}
                        source={require("../../assets/images/repair-dock-login.png")}
                    />
                </View>
                <View style={styles.shopTextView}>
                    <Text
                        style={styles.shopNameText}
                    >{`${fName} ${lName}`}</Text>
                    <Text>{address}</Text>
                </View>
            </View>
            <View style={styles.selectContainer}>
                <View style={styles.ratingContainer}>
                    <Text style={{ alignSelf: "flex-start", marginLeft: 3 }}>
                        Rating:
                    </Text>
                    <Rating ratingValue={rating} />
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.priceText}>£30</Text>
                    <Button icon="library-add-check" onPress={onSelectHandler}>
                        Select
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#e6e6e6",
        borderRadius: 20,
        marginVertical: 10,
        width: "90%",
        alignSelf: "center",
    },
    shopDetailsContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
        alignItems: "center",
    },
    shopNameText: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 5,
    },
    shopTextView: {
        marginLeft: 20,
    },
    selectContainer: {
        flexDirection: "row",
        // justifyContent: "space-between",
    },
    profileImage: {
        width: 80,
        height: 80,
        borderColor: "black",
        borderWidth: 1,
        marginTop: 15,
        borderRadius: 60,
        backgroundColor: "#bcbcbc",
        alignItems: "center",
        justifyContent: "center",
    },
    ratingContainer: {
        alignItems: "flex-start",
        justifyContent: "center",
        flex: 1,
        marginLeft: 15,
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        flex: 1,
        paddingBottom:3
    },
    priceText: {
        fontWeight: "bold",
        fontSize: 20,
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 60,
    },
});

export default ShopCard;
