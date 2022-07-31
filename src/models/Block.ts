import { BlockType } from "../types/blockTypes";

class Block {

    sequence: number = -1;
    prevBlock: BlockType | null = null;
    currentBlock: BlockType | null = null;
    nextBlock: BlockType | null = null;


    constructor(prevBlock: BlockType | null, currentBlock: BlockType, nextBlock: BlockType | null, sequence?: number) {
        this.prevBlock = prevBlock;
        this.currentBlock = currentBlock;
        this.nextBlock = nextBlock;
        this.sequence = sequence || -1;
    }

    updatePosition?(sequence: number) {
        this.sequence = sequence;
    }
}

Block.prototype.toString = function BlockToString() {
    return `${this.prevBlock ? `${this.prevBlock.key} -` : ""} ${this.sequence > -1 ? `[${this.sequence}]` : ""} ${this.currentBlock ? `${this.currentBlock.key}` : ""} ${this.nextBlock ? ` - ${this.nextBlock.key}` : ""}`
}

export default Block;
