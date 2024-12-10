import { part1 } from './part1.ts';

const testCasesPt1: [Parameters<typeof part1>[0], ReturnType<typeof part1>][] =
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
			36,
		],
	];

describe('Day 10, part 1', () => {
	test.each(testCasesPt1)('Input:\n%s\nOutput:\n%s', (input, expected) => {
		expect(part1(input)).toBe(expected);
	});
});
