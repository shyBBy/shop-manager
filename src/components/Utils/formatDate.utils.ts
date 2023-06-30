export const formatDate = (dateString: string | any) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", {month: "short"});
    return `${day} ${month}`;
};

export const formatDateWithYearAndHours = (dateString: string | any) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day} ${month} ${year}, ${hours}:${minutes}`;
};