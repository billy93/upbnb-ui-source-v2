export const padNumber = (n: number) => n.toString().padStart(2, "0")
export const formatNumber = (n: number, precision: number = 2) => n.toLocaleString(undefined, { maximumFractionDigits: precision, minimumFractionDigits: precision });