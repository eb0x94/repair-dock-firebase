import { StyleSheet, Text, View } from "react-native";

import RepairSurvey from "../components/repair/RepairSurvey";

const SurveyScreen = ({ route }) => {
    let deviceDetails = route.params.deviceDetails;

    return <RepairSurvey device={deviceDetails} />;
};

const styles = StyleSheet.create({});

export default SurveyScreen;
