import numeral from "numeral";

export function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function formatNumber(value, format = "", rounding = Math.floor) {
    return numeral(value).format(format, rounding);
}
