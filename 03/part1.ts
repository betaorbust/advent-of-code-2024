/**
 Part 1
*/
export const part1 = (input: string) =>
	[...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)].reduce((acc, [, a, b]) => {
		if (!a || !b) {
			throw new Error('Invalid input');
		}
		return acc + parseInt(a) * parseInt(b);
	}, 0);
