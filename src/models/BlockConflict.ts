import { BlockPosition, BlockType } from "../types/blockTypes";
import Block from "./Block";

class BlockConflict {

    sequence: number = -1
    expect: BlockType | null = null
    received: BlockType | null = null
    block: Block | null = null
    expectPosition: BlockPosition.current | BlockPosition.last | BlockPosition.previous

    constructor(expectPosition: string, sequence: number, expect: BlockType, received: BlockType, block: Block) {
        this.sequence = sequence
        this.expect = expect
        this.received = received;
        this.block = block;
        this.expectPosition = expectPosition as BlockPosition
    }



}

BlockConflict.prototype.toString = function BlockConflictToString() {
    if (this.sequence > -1) {
        return `Conflict record for [${this.sequence}] >> Expected ${this.expect?.key} for ${this.expectPosition} block and got ${this.received?.key} , Input : ${this.block} `
    }
    return ""
}


export default BlockConflict;
