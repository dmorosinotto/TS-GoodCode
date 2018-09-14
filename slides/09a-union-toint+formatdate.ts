export {};

function toInt(n: number | string): number {
    if (typeof n === "string") {
        return parseInt(n, 10);
    } else {
        return Math.floor(n); //n|0;
    }
}

toInt("-1.2"); //-2
toInt(3.45); //3
toInt(-67); //-67
toInt("8.90"); //8
toInt([0]); //ALWAYS ERROR

function formatDate(date: string | Date, format?: string): string {
    if (typeof date === "string") {
        date = new Date(date);
    }
    if (!format) return date.toISOString();
    var str = format;
    str = str.replace("yyyy", "" + date.getFullYear());
    str = str.replace("MM", "" + (date.getMonth() + 1));
    str = str.replace("dd", "" + date.getDate());
    str = str.replace("HH", "" + date.getHours());
    str = str.replace("mm", "" + date.getMinutes());
    str = str.replace("ss", "" + date.getSeconds());
    return str;
}

formatDate("20/03/1975", "yyyy-MM-dd");
formatDate(new Date());
formatDate(new Date(), "@dd of MM in yyyy");
