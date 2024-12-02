/**
 Part 1
*/

export function parse(input: string) {
	return input.split('\n').map((line) => {
		return line.split(' ').map((num) => parseInt(num, 10));
	});
}

export const part1 = (input: string) => {
	const arr = parse(input);
	return arr.filter((line) => {
		const [a, b] = line;
		if (a === undefined || b === undefined) {
			console.log('Invalid input', [a, b]);
			return false;
		}
		let previous = a;
		return line.slice(1).every((value) => {
			if (
				Math.sign(value - previous) !== Math.sign(b - a) ||
				Math.abs(value - previous) > 3
			) {
				return false;
			}
			previous = value;
			return true;
		});
	}).length;
};
