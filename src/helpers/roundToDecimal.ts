export default function roundToDecimal(num: number, decimal: number) {
	return Math.round((num + Number.EPSILON) * decimal) / decimal;
}
