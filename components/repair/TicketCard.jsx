import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
    FlatList,
} from "react-native";
import { fetchDataWithID } from "../../util/database";
import Button from "../UI/Button";
import FlatButton from "../UI/FlatButton";

import Collapsible from "react-native-collapsible";

const TicketCard = ({ ticket, commentAdder, isAdmin }) => {
    let { device, date, status } = ticket.ticket;
    let details = ticket.ticket.details;
    let [deviceDetails, setDeviceDetails] = useState({});
    let [isDetails, setIsDetails] = useState(false);
    let [isComment, setIsComment] = useState(false);
    let [comment, setComment] = useState("");
    let surveyDetails = "";

    for (const key in details.survey) {
        if (Object.hasOwnProperty.call(details.survey, key)) {
            if (details.survey[key]) {
                switch (key) {
                    case "batteryReplacement":
                        surveyDetails += "Battery, ";
                    case "brokenScreen":
                        surveyDetails += "Screen, ";
                    case "notTurningOn":
                        surveyDetails += "Power, ";
                    case "notCharging":
                        surveyDetails += "Charging, ";
                    case "slow":
                        surveyDetails += "Slow, ";
                    case "lowStorage":
                        surveyDetails += "Storage, ";
                }
            }
        }
    }

    useEffect(() => {
        try {
            let getDeviceDetails = async () => {
                let fetchedUserDevice = await fetchDataWithID(
                    device,
                    "/devices"
                );

                if (fetchedUserDevice) {
                    setDeviceDetails(fetchedUserDevice);
                }
            };
            getDeviceDetails();
        } catch (error) {
            console.log(error);
        }
    }, [device]);

    let addInputHandler = (text) => {
        setComment(text);
    };

    let saveCommentHandler = () => {
        if (!comment) {
            Alert.alert("Wrong input", "You cannot send empty comment.", [
                {
                    text: "Close",
                    onPress: () => {
                        setIsComment(false);
                        setComment("");
                    },
                },
            ]);
            return;
        }

        let commentsArray = details.comments;
        commentsArray.push({ isUser: !isAdmin, commentText: comment });
        details = { ...details };
        commentAdder(details, ticket.id);
        setComment("");
        setIsComment(false);
    };

    let commmentButton = status !== "completed" && (
        <Button
            onPress={!isComment ? () => setIsComment(true) : saveCommentHandler}
        >
            {(!isComment ? "Add" : "Send") + " comment"}
        </Button>
    );

    let tapDetails = (
        <Collapsible collapsed={!isDetails}>
            <View>
                <View style={styles.borderView}></View>
                <View style={styles.ticketCommentsView}>
                    <Text style={styles.commentText}>Comments:</Text>
                    <View>
                        <FlatList
                            data={details.comments}
                            keyExtractor={(item, index) => index}
                            renderItem={(item) => (
                                <View
                                    style={{
                                        borderBottomWidth: 0.5,
                                        paddingHorizontal: 5,
                                        justifyContent: "center",
                                        alignItems: item.item.isUser
                                            ? "flex-end"
                                            : "flex-start",
                                    }}
                                >
                                    <Text style={styles.messageText}>
                                        {item.item.commentText}
                                    </Text>
                                </View>
                            )}
                        />
                    </View>
                </View>
                {isComment && (
                    <TextInput
                        style={styles.commentInputBox}
                        placeholder="Type comment"
                        value={comment}
                        onChangeText={addInputHandler}
                    />
                )}
                {commmentButton}
            </View>
        </Collapsible>
    );

    return (
        <View
            style={styles.card}
            onPress={() => {
                setIsDetails((prevState) => !prevState);
            }}
        >
            <View style={styles.contentView}>
                <View style={styles.titleView}>
                    <Text
                        style={styles.deviceText}
                    >{`${deviceDetails.make} ${deviceDetails.model}`}</Text>
                    <Text style={[styles.genText, styles.dateText]}>
                        {date}
                    </Text>
                </View>
                <Text style={styles.genText}>
                    Status:{" "}
                    <Text style={styles.statusText}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Text>
                </Text>
                {surveyDetails.length !== 0 && (
                    <Text style={styles.genText}>
                        Problem:{" "}
                        <Text style={{ fontWeight: "bold" }}>
                            {surveyDetails.slice(0, -2)}
                        </Text>
                    </Text>
                )}

                {tapDetails}
                <FlatButton
                    style={styles.tapForDetails}
                    onPress={() => {
                        setIsDetails((prevstate) => !prevstate);
                    }}
                >
                    {!isDetails ? "Open details" : "Close details"}
                </FlatButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#82a6d2",
        marginVertical: 10,
        borderRadius: 20,
        elevation: 6,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        padding: 10,
    },
    contentView: {
        width: "95%",
        height: "95%",
    },
    titleView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    pressed: {
        opacity: 0.7,
    },
    tapForDetails: {
        alignSelf: "baseline",
    },
    ticketCommentsView: {
        marginBottom: 8,
    },
    borderView: {
        marginVertical: 10,
        borderTopWidth: 2,
    },
    commentInputBox: {
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 20,
        width: "100%",
        height: 45,
        paddingHorizontal: 15,
        backgroundColor: "white",
    },
    // Text
    deviceText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 13,
    },
    commentText: {
        alignSelf: "center",
        fontSize: 18,
    },
    messageText: {
        paddingVertical: 3,
    },
    statusText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    genText: {
        marginBottom: 5,
    },
    dateText: {
        alignSelf: "center",
        paddingRight: 5,
    },
});

export default TicketCard;
