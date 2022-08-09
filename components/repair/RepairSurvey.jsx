import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SurveyCard from "./SurveyCard";
import { MaterialIcons } from "@expo/vector-icons";

const RepairSurvey = ({ device }) => {
    const [selectedCard, setSelectedCard] = useState({
        selected: null,
        data: ["selected", "not selected"],
    });

    return (
        <>
            <View style={styles.container}>
                {/* <SurveyCard>
                    <MaterialIcons name="add-circle-outline" size={44} />
                    <Text>Card Text</Text>
                </SurveyCard>
                <SurveyCard>
                    <MaterialIcons name="add-circle-outline" size={44} />
                    <Text>Card Text</Text>
                </SurveyCard>
                <SurveyCard>
                    <MaterialIcons name="add-circle-outline" size={44} />
                    <Text>Card Text</Text>
                </SurveyCard> */}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
    },
});

export default RepairSurvey;
