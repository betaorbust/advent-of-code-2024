import { part2 } from './part2.ts';

const testCasesPt2: [Parameters<typeof part2>[0], ReturnType<typeof part2>][] =
	[
		[
			`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
			81,
		],
	];

describe('Day 10, part 2', () => {
	test.each(testCasesPt2)('Input:\n%s\nOutput:\n%s', (input, expected) => {
		expect(part2(input)).toBe(expected);
	});
});
