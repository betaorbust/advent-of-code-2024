import { parse } from './part1.ts';

/**
 Part 2
*/

function check(line: number[]) {
	const [first, second] = line;
	if (first === undefined || second === undefined) {
		throw new Error('Invalid input');
	}
	const sign = Math.sign(second - first);
	return line.every((value, i, li) => {
		if (i === 0) {
			return true;
		}
		const last = li[i - 1];
		if (last === undefined) {
			throw new Error('Last value was undefined');
		}
		return (
			Math.sign(value - last) === sign &&
			Math.abs(value - last) <= 3 &&
			Math.abs(value - last) > 0
		);
	});
}

export const part2 = (input: string) => {
	const arr = parse(input);
	return arr.filter((line) => {
		return check(line) || line.some((_, i, li) => check(li.toSpliced(i, 1)));
	}).length;
};
