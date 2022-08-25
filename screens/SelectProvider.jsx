import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import ShopCard from "../components/repair/ShopCard";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { fetchShops, createEntry } from "../util/database";
import { useNavigation } from "@react-navigation/native";

const SelectProvider = ({ route }) => {
    let navigator = useNavigation();
    let device = route.params.device;
    let repair = route.params.details;

    let [repairShops, setRepairShops] = useState();
    let [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setIsFetching(true);
        try {
            let getAdmins = async () => {
                let returnedShops = await fetchShops("users");

                if (returnedShops && !isFetching) {
                    setRepairShops(returnedShops);
                }
            };

            getAdmins();
        } catch (error) {
            console.log(error.response);
            setIsFetching(false);
        }

        return () => {
            setIsFetching(false);
        };
    }, []);

    let createTicket = (shopID) => {
        let ticketDetails = {
            status: "new",
            device: device.id,
            users: {
                userId: device.data.ownerId,
                shopId: shopID,
            },
            details: {
                comments: [repair.additionalComment],
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
