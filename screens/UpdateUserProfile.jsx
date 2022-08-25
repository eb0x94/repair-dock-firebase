import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Button from "../components/UI/Button";

const UpdateUserProfile = ({ route }) => {
    let { fName, lName, email, phoneNumber } = route.params;

    return (
        <View>
            <Text>Pesonal details update</Text>
            <View>
                <Text>{fName}</Text>
                <Text>{lName}</Text>
                <Text>{phoneNumber}</Text>
            </View>
            <Button>Save</Button>
        </View>
    );
};

const styles = StyleSheet.create({});

export default UpdateUserProfile;
