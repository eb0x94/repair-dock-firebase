import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import ShopCard from "../components/repair/ShopCard";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { fetchShops, createEntry } from "../util/database";
import { useNavigation } from "@react-navigation/native";

const SelectProvider = ({ route }) => {
    let navigator = useNavigation();
    let device = route.params.device;
    let repair = route.params.details;

    let [repairShops, setRepairShops] = useState({});
    let [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsFetching(true);
            try {
                let getShops = async () => {
                    let returnedShops = await fetchShops();

                    if (returnedShops && !isFetching) {
                        setRepairShops(returnedShops);
                    }
                };

                getShops();
            } catch (error) {
                console.log(error.response);
                setIsFetching(false);
            }
        }, 1500);

        return () => {
            setIsFetching(false);
        };
    }, []);

    let createTicket = (shopID) => {
        let ticketDetails = {
            status: "Created",
            device: device.id,
            users: {
                userId: device.data.ownerId,
                shopId: shopID,
            },
            details: {
                comments: [{ isUser: true, commentText: repair.additionalComment }],
                survey: repair.surveyDetails,
            },
            date: new Date().toISOString().slice(0, 10),
        };
        createEntry("tickets", ticketDetails);
        navigator.navigate("Home");
    };

    let selectedShopHandler = (shopIdNew) => {
        Alert.alert(
            "Just checking...",
            "You are about to create a repair ticket. Are you sure?",
            [
                {
                    text: "No",
                    style: "destructive",
                    onPress: () => {
                        return;
                    },
                },
                {
                    text: "Yes",
                    onPress: () => {
                        createTicket(shopIdNew);
                    },
                },
            ]
        );
    };

    if (!isFetching) {
        return <LoadingOverlay message="Fetching shops" />;
    }

    return (
        <>
            <FlatList
                style={styles.listMargin}
                data={repairShops}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ShopCard
                        shopDetails={item.data}
                        shopId={item.shopId}
                        onSelectedShop={selectedShopHandler}
                    />
                )}
            />
        </>
    );
};
const styles = StyleSheet.create({
    listMargin: { marginTop: 10 },
});

export default SelectProvider;
