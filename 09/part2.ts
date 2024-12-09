import { calculateChecksum, parse, safeGet } from './part1.ts';

/**
 Part 2
*/
export const part2 = (input: string) => {
	const blocks = parse(input);

	let lastFileBlockIndex = blocks.length - 1;

	while (lastFileBlockIndex > 0) {
		const fileBlock = safeGet(blocks, lastFileBlockIndex);

		if (fileBlock.id !== 'free' && !fileBlock.moved) {
			const firstWholeFreeBlockIndex = blocks.findIndex(
				(block, idx) =>
					idx < lastFileBlockIndex &&
					block.id === 'free' &&
					block.length >= fileBlock.length,
			);
			if (firstWholeFreeBlockIndex !== -1) {
				// If we did find one, turn the file block into a free block and splice
				// a new file block into the free block. Reduce the length of the free block
				// accordingly or remove it if it's 0.
				const freeBlock = safeGet(blocks, firstWholeFreeBlockIndex);
				blocks.splice(
					firstWholeFreeBlockIndex,
					// Delete the free block if it's the same length as the file block
					freeBlock.length === fileBlock.length ? 1 : 0,
					{
						id: fileBlock.id,
						length: fileBlock.length,
						moved: true,
					},
				);
				freeBlock.length -= fileBlock.length;
				fileBlock.id = 'free';
			}
		}
		lastFileBlockIndex -= 1;
	}

	return calculateChecksum(blocks.filter((block) => block.length > 0));
};
