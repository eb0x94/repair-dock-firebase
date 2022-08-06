import { Device } from "../../models/device";
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
        "Repair History",
        "View previous repairs",
        "history",
        "historyRepair"
    ),
];

export const DEVICES = [
    new Device(0, "smartphone", { brand: "Apple", model: "iPhone 13" }),
    new Device(1, "smartphone", { brand: "Samsung", model: "Galaxy Note 9" }),
    new Device(2, "tablet", { brand: "Apple", model: "iPad Pro" }),
    new Device(3, "laptop", { brand: "Apple", model: "MacBook Pro" }),
    new Device(4, "laptop", { brand: "Lenovo", model: "Yoga" }),
];
export const DEVICES_EMPTY = [];
