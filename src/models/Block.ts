import { BlockType } from "../types/Block";

class Block {

    sequence: number;
    prevBlock: BlockType | null = null;
    currentBlock: BlockType | null = null;
    nextBlock: BlockType | null = null;


    constructor(prevBlock: BlockType | null, currentBlock: BlockType, nextBlock: BlockType | null, sequence?: number) {
        this.prevBlock = prevBlock;
        this.currentBlock = currentBlock;
        this.nextBlock = nextBlock;
        this.sequence = sequence || 0;
    }

    updatePosition(sequence: number) {
        this.sequence = sequence;
    }



}

Block.prototype.toString = function BlockToString() {
    if (this.sequence > -1) {
        return `${this.prevBlock?.key}-[${this.sequence}]${this.currentBlock?.key}-${this.nextBlock?.key}`
    }
    return ""
}

export default Block;
