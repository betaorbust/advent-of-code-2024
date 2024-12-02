/**
 Part 1
*/
export function parse(input: string) {
	return input
		.split('\n')
		.map((line) =>
			line
				.split(/\s+/)
				.map((num) => parseInt(num, 10))
				.filter((num) => !isNaN(num)),
		)
		.reduce<[Array<number>, Array<number>]>(
			(acc, [a, b]) => [
				[...(a === undefined ? [] : [a]), ...acc[0]],
				[...(b === undefined ? [] : [b]), ...acc[1]],
			],
			[[], []],
		)
		.map((column) => column.toSorted());
}

export const part1 = (input: string) => {
	const [a, b] = parse(input);
	if (!a || !b || a.length !== b.length) {
		throw new Error('Invalid input');
	}

	return a.reduce<number>((acc, num, i) => {
		const bNum = b[i];
		if (bNum === undefined) {
			throw new Error(`Invalid input: b[${i}]`);
		}
		return acc + Math.abs(num - bNum);
	}, 0);
};
