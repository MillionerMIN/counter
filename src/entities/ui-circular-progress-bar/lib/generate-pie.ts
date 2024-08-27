// ----  PIE calculation funciton --------
export function generatePie(value: number, radius: number) {
	const x = radius - Math.cos((2 * Math.PI) / (100 / value)) * radius;
	const y = radius + Math.sin((2 * Math.PI) / (100 / value)) * radius;
	const long = value <= 50 ? 0 : 1;
	const d = `M${radius} ${radius} L${radius} ${0} A${radius} ${radius} 0 ${long} 1 ${y} ${x} Z`;

	return d;
};