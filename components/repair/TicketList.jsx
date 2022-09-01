import { FlatList, StyleSheet, Text } from "react-native";
import TicketCard from "./TicketCard";

const TicketList = ({ tickets, addComment, isAdmin, statusUpdater }) => {
    let ticketHandler = (comment, id) => {
        addComment(comment, id);
    };

    if (tickets.length == 0) {
        return (
            <Text style={styles.infoText}>
                You don't have any created tickets yet
            </Text>
        );
    }

    return (
        <>
            <FlatList
                style={styles.listContainer}
                data={tickets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TicketCard
                        isAdmin={isAdmin}
                        ticket={item}
                        statusUpdater={statusUpdater}
                        commentAdder={ticketHandler}
                    />
                )}
            />
        </>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        width: "90%",
        paddingVertical: 10,
        alignSelf: "center",
    },
    infoText: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
        marginTop: "70%",
        marginBottom: 20,
    },
});

export default TicketList;
