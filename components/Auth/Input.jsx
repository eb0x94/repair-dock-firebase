import { StyleSheet, Text, TextInput, View } from "react-native";

const Input = ({
    label,
    keyboardType,
    secure,
    onUpdateValue,
    value,
    isInvalid,
}) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
                {label}
            </Text>
            <TextInput
                style={[styles.input, isInvalid && styles.inputInvalid]}
                // autoCapitalize={false}
                // autoCapitalize="none"
                keyboardType={keyboardType}
                secureTextEntry={secure}
                onChangeText={onUpdateValue}
                value={value}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 8,
    },
    label: {
        color: "black",
        marginBottom: 4,
    },
    labelInvalid: {
        color: "red",
    },
    input: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        borderRadius: 4,
        fontSize: 16,
    },
    inputInvalid: {},
});

export default Input;
