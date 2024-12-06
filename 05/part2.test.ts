import { part2 } from './part2.ts';

const testCasesPt2: [Parameters<typeof part2>[0], ReturnType<typeof part2>][] =
	[
		[
			`47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
			123,
		],
	];

describe('Day 5, part 2', () => {
	test.each(testCasesPt2)('Input:\n%s\nOutput:\n%s', (input, expected) => {
		expect(part2(input)).toBe(expected);
	});
});
