export const formatDatetime = (date:string) => {
    return new Date(date).toLocaleDateString("th-TH", { timeZone: "UTC" })
}