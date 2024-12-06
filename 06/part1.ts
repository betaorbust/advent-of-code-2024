/**
 Part 1
*/
import { Grid, GridDirection } from '../lib/junk-drawer.ts';

export const parse = (input: string) => {
	const board = new Grid(input.split('\n').map((line) => line.split('')));
	const guardStart = board.find((element) => element.value === '^');
	if (!guardStart) {
		throw new Error('No guard found');
	}
	return { board, guardStart };
};

export const turnRight = (direction: GridDirection) => {
	const directions = ['N', 'E', 'S', 'W'] as const;
	return directions[directions.indexOf(direction) + 1] ?? 'N';
};

export const part1 = (input: string) => {
	const { board, guardStart } = parse(input);
	let guardDirection: GridDirection = 'N';
	const visited = new Set<string>();
	let currentGuard = guardStart;
	try {
		while (true) {
			visited.add(currentGuard.id);
			while (true) {
				const { value: inFront } = board.move(currentGuard, guardDirection, 1);
				if (inFront.value === '#') {
					guardDirection = turnRight(guardDirection);
				} else {
					currentGuard = inFront;
					break;
				}
			}
		}
	} catch {
		// Do nothing. We're expecting the grid to throw when the
		// guard goes off the edge
	}
	return visited.size;
};
