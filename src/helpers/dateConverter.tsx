
export const dateConverter = (dateToConvert: Date | string) => {
    const inputDate = typeof dateToConvert === 'string' ? new Date(dateToConvert) : dateToConvert;

    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const year = inputDate.getFullYear();

    return `${day}.${month}.${year}`;
}