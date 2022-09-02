import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import TicketList from "../components/repair/TicketList";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { fetchUserTickets, updateItem } from "../util/database";

const RepairHistory = ({route}) => {
    let { userId, isAdmin } = route.params;
    let [tickets, setTickets] = useState([]);
    let [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        try {
            let fetchTickets = async () => {
                let fetchedTickets = await fetchUserTickets(userId).then(
                    (items) =>
                        items.filter(
                            (item) => item.ticket.status === "Finished"
                        )
                );
                if (!isMounted) {
                    setTickets(fetchedTickets);
                    setIsMounted(true);
                }
            };
            fetchTickets();
        } catch (error) {
            console.log(error.response);
        }

        return () => {
            setIsMounted(true);
        };
    }, []);

    let updateTicket = (ticketToPush, id) => {
        updateItem(id, "/tickets", ticketToPush)
            .then((res) => {})
            .catch((error) => console.log(error));
    };

    let statusUpdater = (newStatus, id) => {
        tickets.map((ticket) => {
            if (ticket.id === id) {
                let ticketItem = ticket.ticket;
                let update = { ...ticketItem, status: newStatus };

                updateTicket(update, id);
            }
        });
    };

    let addComment = (details, id) => {
        tickets.map((ticket) => {
            if (ticket.id === id) {
                let ticketItem = ticket.ticket;
                let ticketUpdater = {
                    ...ticketItem,
                    details,
                };
                updateTicket(ticketUpdater, id);
            }
        });
    };

    if (!isMounted) {
        return <LoadingOverlay message={"Loading tickets..."} />;
    }


    return (
        <TicketList
            isAdmin={isAdmin}
            style={styles.container}
            tickets={tickets}
            finished={true}
            statusUpdater={statusUpdater}
            addComment={addComment}
        />
    );


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default RepairHistory;
