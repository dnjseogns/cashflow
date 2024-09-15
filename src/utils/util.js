export const numRound = (num, decimalPoint) => {
    const point = Math.pow(10,decimalPoint);
    return Math.round(num * point) / point;
};