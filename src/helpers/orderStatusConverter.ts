import {OrderStatusColor} from "../interfaces/order.interfaces";


export const OrderStatusConverter = (status: string | any) => {
    switch (status) {
        case "pending":
            return "Oczekujące";
        case "processing":
            return "W trakcie realizacji";
        case "on-hold":
            return "Wstrzymane";
        case "completed":
            return "Zakończone";
        case "cancelled":
            return "Anulowane";
        case "refunded":
            return "Zwrócone";
        case "in-transit":
            return "Wysłane";
        case "failed":
            return "Nieudane";
        case "trash":
            return "Kosz";
        default:
            return status;
    }
};

export const getStatusColor = (status: string | any) => {
    switch (status) {
        case "pending":
            return OrderStatusColor.PENDING;
        case "processing":
            return OrderStatusColor.PROCESSING;
        case "on-hold":
            return OrderStatusColor.ON_HOLD;
        case "completed":
            return OrderStatusColor.COMPLETED;
        case "cancelled":
            return OrderStatusColor.CANCELLED;
        case "refunded":
            return OrderStatusColor.REFUNDED;
        case "failed":
            return OrderStatusColor.FAILED;
        case "in-transit":
            return OrderStatusColor.IN_TRANSIT;
        case "trash":
            return OrderStatusColor.TRASH;
        default:
            return OrderStatusColor.DEFAULT;
    }
};

