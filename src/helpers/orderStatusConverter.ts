export const OrderStatusConverter = (status: string) => {
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
        case "failed":
            return "Nieudane";
        case "trash":
            return "Kosz";
        default:
            return status;
    }
};

export const getStatusColor = (status: string) => {
    switch (status) {
        case "pending":
            return "#ffd166";
        case "processing":
            return "#468faf";
        case "on-hold":
            return "#fb8500";
        case "completed":
            return "#80ed99";
        case "cancelled":
            return "#780000";
        case "refunded":
            return "purple";
        case "failed":
            return "gray";
        case "trash":
            return "black";
        default:
            return "gray";
    }
};