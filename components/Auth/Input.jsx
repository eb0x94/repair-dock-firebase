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
                autoCapitalize="none"
                autoCorrect={false}
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
        color: "white",
        marginBottom: 4,
    },
    labelInvalid: {
        color: "pink",
    },
    input: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        borderRadius: 4,
        fontSize: 16,
        backgroundColor: "white",
        color: "black",
    },
    inputInvalid: {
        backgroundColor: "pink",
    },
});

export default Input;
