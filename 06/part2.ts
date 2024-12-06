import { GridDirection } from '../lib/junk-drawer.ts';
import { parse, turnRight } from './part1.ts';

/**
 Part 2
*/
export const part2 = (input: string) => {
	const { board: initialBoard, guardStart } = parse(input);
	return (
		initialBoard
			.map<number>((initEntry) => {
				// Skip if the entry is the guard's starting point or is already a block.
				if (['#', '^'].includes(initEntry.value)) {
					return 0;
				}
				// We're going to modify the internal state of the board, so
				// instead of trying to put things back, just do the quick and dirty
				// thing and clone the whole thing.
				const board = initialBoard.clone();
				let currentGuard = guardStart;
				let guardDirection: GridDirection = 'N';
				// Visited is a combination of the guard's id and the direction it's facing
				// if we ever see that same combination again, we know we're in a loop
				const visited = new Set<string>();
				// Getting the entry on the current board from the address we're currently
				// looping over
				const currentEntry = board.getAddress(initEntry.row, initEntry.column);
				if (!currentEntry) {
					throw new Error('no current entry');
				}
				// Swap this entry for a # to test if we can make a loop with it
				currentEntry.value = '#';
				// Using a try/catch because the grid will throw if the guard
				// exits one side.
				try {
					while (true) {
						// Mark we were here
						visited.add(currentGuard.id + guardDirection);
						// Move to the next
						while (true) {
							// Look at the spot in front of the guard
							const { value: inFront } = board.move(
								currentGuard,
								guardDirection,
								1,
							);
							// Turn if that spot is a block
							if (inFront.value === '#') {
								guardDirection = turnRight(guardDirection);
							} else {
								// Check if we've been here before in this direction
								if (visited.has(inFront.id + guardDirection)) {
									return 1;
								}
								// Otherwise just move forward
								currentGuard = inFront;
								break;
							}
						}
					}
				} catch {
					// If we walked off the map, it wasn't a loop
					return 0;
				}
			})
			// It's a grid
			.flat(2)
			// count the loops
			.reduce((a, c) => a + c, 0)
	);
};
