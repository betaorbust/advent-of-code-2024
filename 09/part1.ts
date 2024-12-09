/**
 Part 1
*/

type Block = {
	id: number | 'free';
	length: number;
	moved?: boolean;
};

export function parse(input: string) {
	let blockId = 0;
	return [...input].map((numStr, i) => {
		const isFile = i % 2 === 0;
		const block: Block = {
			id: isFile ? blockId : 'free',
			length: parseInt(numStr),
		};
		blockId += isFile ? +1 : 0;
		return block;
	});
}

export function safeGet(block: Block[], index: number) {
	const result = block[index];
	if (!result) {
		throw new Error(`Index ${index} out of bounds`);
	}
	return result;
}

export function calculateChecksum(blocks: Block[]) {
	return blocks.reduce(
		({ checksum, startIndex }, { id, length }) => {
			const endIndex = startIndex + length - 1;
			return {
				startIndex: startIndex + length,
				checksum:
					id === 'free'
						? checksum
						: checksum +
							(startIndex + (endIndex - startIndex) / 2) *
								(endIndex - startIndex + 1) *
								id,
			};
		},
		{
			startIndex: 0,
			checksum: 0,
		},
	).checksum;
}

export const part1 = (input: string) => {
	const blocks = parse(input);
	let index = 0;
	let lastFileBlockIndex =
		// File and Free blocks alternate, so we can just check if it's even or odd
		blocks.length % 2 === 0 ? blocks.length - 2 : blocks.length - 1;

	const result: Block[] = [];
	while (index <= lastFileBlockIndex) {
		const currentBlock = safeGet(blocks, index);
		if (currentBlock.id !== 'free') {
			result.push(currentBlock);
			index += 1;
		} else {
			// free block
			const lastFileBlock = safeGet(blocks, lastFileBlockIndex);
			// Three options:
			if (lastFileBlock.length < currentBlock.length) {
				// Fits, with extra left over
				result.push(lastFileBlock);
				// Moving back 2 skips the free block
				lastFileBlockIndex -= 2;
				// Modify the current free block to have the remaining length
				currentBlock.length -= lastFileBlock.length;
			} else if (lastFileBlock.length === currentBlock.length) {
				// Fits with nothing left over
				result.push(lastFileBlock);
				lastFileBlockIndex -= 2;
				index += 1;
			} else {
				// Doesn't fit
				const newBlock: Block = {
					id: lastFileBlock.id,
					length: currentBlock.length,
				};
				result.push(newBlock);
				lastFileBlock.length -= currentBlock.length;
				index += 1;
			}
		}
	}

	return calculateChecksum(result);
};
