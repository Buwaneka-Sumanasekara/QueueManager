import { BlockType } from "../types/Block";
import Block from "./Block";

class BlockConflict {

    sequence: number = -1
    expect: BlockType | null = null
    received: BlockType | null = null
    block: Block | null = null

    constructor(sequence: number, expect: BlockType, received: BlockType, block: Block) {
        this.sequence = sequence
        this.expect = expect
        this.received = received;
        this.block = block;
    }



}

BlockConflict.prototype.toString = function BlockConflictToString() {
    if (this.sequence > -1) {
        return `Conflict record for [${this.sequence}] >> Expected ${this.expect?.key} for previous block and got ${this.received?.key} , Input : ${this.block} `
    }
    return ""
}


export default BlockConflict;
