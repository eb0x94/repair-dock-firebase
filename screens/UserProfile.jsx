import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AccountDetails from "../components/UserProfile/AccountDetails";

import { fetchDataWithID } from "../util/database";

const UserProfile = ({ route }) => {
    const { userId } = route.params;
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        let isCancelled = false;
        try {
            let fetchUserDetails = async () => {
                let userDetails = await fetchDataWithID(userId, "users");

                if (userDetails && !isCancelled) {
                    setUserInfo(userDetails);
                }
            };

            fetchUserDetails();
        } catch (error) {
            console.log(error);
        }

        return () => {
            isCancelled = true;
        };
    }, [userInfo]);

    return <AccountDetails profileData={userInfo} />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default UserProfile;
