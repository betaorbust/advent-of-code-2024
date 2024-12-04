import { part2 } from './part2.ts';

const testCasesPt2: [Parameters<typeof part2>[0], ReturnType<typeof part2>][] =
	[
		[
			`.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`,
			9,
		],
	];

describe('Day 4, part 2', () => {
	test.each(testCasesPt2)('Input:\n %s.\n Output:\n %s', (input, expected) => {
		expect(part2(input)).toBe(expected);
	});
});
