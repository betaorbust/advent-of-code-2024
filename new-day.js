import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const lastDir =
	readdirSync('./', { withFileTypes: true })
		.filter((f) => f.isDirectory() && /^\d\d$/.test(f.name))
		.map((f) => f.name)
		.sort()
		.reverse()[0] || '0';

const today = Number.parseInt(lastDir, 10) + 1;
const nextDir = today.toString().padStart(2, '0');

mkdirSync(nextDir);

const test = `import { part1 } from './part1.ts';
// import { part2 } from './part2.ts';

const testCasesPt1: [Parameters<typeof part1>[0], ReturnType<typeof part1>][] =
	[[\`some input\`, \`some output\`]];

describe('Day ${today.toString()}, part 1', () => {
	test.each(testCasesPt1)('Input: %s. Output: %s', (input, expected) => {
		expect(part1(input)).toBe(expected);
	});
});

// const testCasesPt2: [Parameters<typeof part2>[0], ReturnType<typeof part2>][] =
// 	[[\`some input\`, \`some output\`]];

// describe('Day ${today.toString()}, part 2', () => {
// 	test.each(testCasesPt2)('Input: %s. Output: %s', (input, expected) => {
// 		expect(part2(input)).toBe(expected);
// 	});
// });
`;

const part1 = `/**
 Part 1
*/
export const part1 = (input: string) => {
	return 'not implemented';
};`;
const part2 = `/**
 Part 2
*/
export const part2 = (input: string) => {
	return 'not implemented';
};`;
const solution = `import { part1 } from './part1.ts';
import { part2 } from './part2.ts';

const input = \`\`;

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
`;
const problem = `# Advent of Code Day ${today.toString()}

## Part 1

<pre>

</pre>

## Part 2

<pre>

</pre>
`;

writeFileSync(join(nextDir, 'all.test.ts'), test);
writeFileSync(join(nextDir, 'part1.ts'), part1);
writeFileSync(join(nextDir, 'part2.ts'), part2);
writeFileSync(join(nextDir, 'solution.ts'), solution);
writeFileSync(join(nextDir, 'problem.md'), problem);
