
import { MenuItem } from "../../models/homeInfo";

export const MENU_ITEMS = [
    new MenuItem(
        0,
        "Your account",
        "Change your details",
        "account-circle",
        "profile"
    ),
    new MenuItem(
        1,
        "Your devices",
        "Add or remove device",
        "devices",
        "devices"
    ),
    new MenuItem(
        2,
        "Book repair",
        "Request new repair",
        "book-online",
        "bookRepair"
    ),
    new MenuItem(
        3,
        "Ongoing repairs",
        "See open tickets",
        "repeat",
        "currentRepairs"
    ),
    new MenuItem(
        4,
        "Repair History",
        "View previous repairs",
        "history",
        "historyRepair"
    ),
];

export const MENU_ITEMS_ADMIN = [
    new MenuItem(
        0,
        "Your shop",
        "Change shop details",
        "store",
        "profile"
    ),
    new MenuItem(
        1,
        "Your tickets",
        "See opened repair tickets",
        "devices",
        "currentRepairsAdmin"
    ),
    new MenuItem(
        2,
        "Closed Tickets",
        "Completed ticket details",
        "history",
        "historyRepairsAdmin"
    ),
];
