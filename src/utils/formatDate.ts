export const formatDate = (isoDate: string | null | undefined): string => {
    if (!isoDate) return "";

    const [yearStr, monthStr, dayStr] = isoDate.split("T")[0].split("-");

    const year = Number(yearStr);
    const month = Number(monthStr) - 1;
    const day = Number(dayStr);

    const date = new Date(Date.UTC(year, month, day));

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};
