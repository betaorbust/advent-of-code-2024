/**
 Part 1
*/
import { Grid, GridEntry, add } from '../lib/junk-drawer.ts';

export function parse(input: string) {
	// Using the grid utility class I built earlier
	return new Grid(
		input.split('\n').map((l) => l.split('').map((e) => Number.parseInt(e))),
	);
}

// Recursive function to find all paths from a current entry that end in a 9
export function findNine(
	surveyMap: Grid<number>,
	current: GridEntry<number>,
): GridEntry<number>[][] {
	return current.value === 9
		? [[current]]
		: surveyMap
				// Get all the neighbors that are one greater than the current value
				.getNeighbors({ row: current.row, column: current.column }, false)
				.filter((n) => n.value - current.value === 1)
				// gather up the findNine results from each valid neighbor
				.flatMap((neighbor) => {
					return (
						findNine(surveyMap, neighbor)
							// Add the current entry to the front of each path
							.map((path) => [current, ...path])
					);
				});
}

// The actual part 1 solution
export const part1 = (input: string) => {
	const surveyMap = parse(input);
	return (
		surveyMap
			// Get all the starts
			.findAll((el) => el.value === 0)
			// Get all their paths to 9s
			.map((s) => findNine(surveyMap, s))
			// Only pick one path per start/end pair to count
			.map((solutions) => new Set(solutions.map((p) => p.at(-1))).size)
			// Add up the score
			.reduce(add, 0)
	);
};
