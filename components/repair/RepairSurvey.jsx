import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import SurveyCard from "./SurveyCard";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../UI/Button";
import { useNavigation } from "@react-navigation/native";

const RepairSurvey = ({ device }) => {
    const navigation = useNavigation();
    const [surveyDetails, setSurveyDetails] = useState({
        brokenScreen: false,
        batteryReplacement: false,
        notCharging: false,
        notTurningOn: false,
        slow: false,
        lowStorage: false,
    });
    const [additionalComment, setAdditionalComment] = useState("");

    //to catch the last character of the input fields
    useEffect(() => {}, [additionalComment]);

    let onNextHandler = () => {
        if (
            additionalComment.length < 15
        ) {
            Alert.alert(
                "Sorry, too short story",
                "Please, provide more details about the problem. At least 15 characters."
            );
            return;
        }
        navigation.navigate("SelectProvider", {
            details: { surveyDetails, additionalComment },
            device,
        });
    };

    let onSelectCard = (cardName, isSelected) => {
        setSurveyDetails((prevState) => {
            return { ...prevState, [cardName]: isSelected };
        });
    };

    let commentsHandler = (input) => {
        setAdditionalComment(input);
    };

    return (
        <>
            <View>
                <View style={styles.container}>
                    <SurveyCard
                        onSelect={onSelectCard.bind(this, "brokenScreen")}
                    >
                        <MaterialIcons name="add-circle-outline" size={44} />
                        <Text>Screen replacement</Text>
                    </SurveyCard>
                    <SurveyCard
                        onSelect={onSelectCard.bind(this, "batteryReplacement")}
                    >
                        <MaterialIcons name="add-circle-outline" size={44} />
                        <Text>Battery replacement</Text>
                    </SurveyCard>
                    <SurveyCard
                        onSelect={onSelectCard.bind(this, "notCharging")}
                    >
                        <MaterialIcons name="add-circle-outline" size={44} />
                        <Text>Not charging</Text>
                    </SurveyCard>
                    <SurveyCard
                        onSelect={onSelectCard.bind(this, "notTurningOn")}
                    >
                        <MaterialIcons name="add-circle-outline" size={44} />
                        <Text>Not turning on</Text>
                    </SurveyCard>
                    <SurveyCard onSelect={onSelectCard.bind(this, "slow")}>
                        <MaterialIcons name="add-circle-outline" size={44} />
                        <Text>Slow</Text>
                    </SurveyCard>
                    <SurveyCard
                        onSelect={onSelectCard.bind(this, "lowStorage")}
                    >
                        <MaterialIcons name="add-circle-outline" size={44} />
                        <Text>Low storage</Text>
                    </SurveyCard>
                </View>
                <View style={styles.additionalComments}>
                    <TextInput
                        value={additionalComment}
                        onChangeText={commentsHandler}
                        placeholder="Additional comments"
                    />
                </View>
                <View style={styles.buttonView}>
                    <Button onPress={onNextHandler} icon="chevron-right">
                        Next
                    </Button>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    },
    additionalComments: {
        paddingTop:10,
        borderWidth: 1,
        borderRadius: 6,
        width: "90%",
        height: "15%",
        alignSelf: "center",
        paddingHorizontal: 10,
        backgroundColor: "white",
        marginVertical: 15,
    },
    buttonView: {
        marginVertical: 5,
        marginHorizontal: 15,
    },
});

export default RepairSurvey;
