import { part1 } from './part1.ts';

const testCasesPt1: [Parameters<typeof part1>[0], ReturnType<typeof part1>][] =
	[
		[
			`190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
			3749,
		],
	];

describe('Day 7, part 1', () => {
	test.each(testCasesPt1)('Input:\n%s\nOutput:\n%s', (input, expected) => {
		expect(part1(input)).toBe(expected);
	});
});
