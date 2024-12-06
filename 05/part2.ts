import { filterGoodOnes, getMiddlesReducer, parse } from './part1.ts';

/**
 Part 2
*/

function moveElement<T>(array: T[], fromIndex: number, toIndex: number): T[] {
	const element = array.splice(fromIndex, 1)[0];
	if (!element) {
		throw new Error('no element removed');
	}
	array.splice(toIndex, 0, element);
	return array;
}
const fix = (update: number[], rules: [number, number][]) => {
	const solution = [...update];
	// Am I proud of this? No. No I am not.
	while (filterGoodOnes(rules, [solution]).length !== 1) {
		rules.forEach(([r1, r2]) => {
			const i1 = solution.indexOf(r1);
			const i2 = solution.indexOf(r2);
			if ((i1 === -1 || i2 === -1) && i1 > i2) {
				moveElement(solution, i1, i2);
			}
		});
	}
	return solution;
};

export const part2 = (input: string) => {
	const { rules, updates } = parse(input);
	// Yes, I'm trying not to rewrite any of part 1
	const goodOnes = filterGoodOnes(rules, updates).map((u) => JSON.stringify(u));
	const badOnes = updates.filter(
		(update) => !goodOnes.includes(JSON.stringify(update)),
	);
	return badOnes
		.map<number[]>((update) =>
			fix(
				update,
				rules.filter(([r1, r2]) => update.includes(r1) && update.includes(r2)),
			),
		)
		.reduce(getMiddlesReducer, 0);
};
