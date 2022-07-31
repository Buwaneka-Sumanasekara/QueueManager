import { BlockType } from "../types/Block";
import Block from "./Block";
import BlockConflict from "./BlockConflict";

class BlockChain {

    private blockChain: Block[] = [];

    constructor() {
        this.blockChain = []
    }

    getLastBlock(): Block | null {
        return this.blockChain.length > 0 ? this.blockChain[this.blockChain.length - 1] : null;
    }
    getFistBlock(): Block | null {
        return this.blockChain.length > 0 ? this.blockChain[0] : null;
    }
    getCurrentList(): Block[] {
        return this.blockChain;
    }


    private addFirstBlock(block: Block, forceReplace: boolean = false) {
        if (block.prevBlock === null) {
            block.sequence = 1;
            if (this.blockChain.length === 0) {
                this.blockChain.push(block);
            } else if (forceReplace) {
                this.blockChain[0] = block;
            } else {
                const firstBlock = this.getFistBlock();

            }
        } else {
            throw new Error("There is no previous block for the first block");
        }

    }

    addToBlockChainNextPosition(block: Block) {
        if (block.prevBlock === null) {
            return this.addFirstBlock(block);
        } else {
            const lastBlock = this.getLastBlock();
            const nextNo = this.blockChain.length + 1;
            block.sequence = nextNo

            if (lastBlock?.nextBlock?.key === block.currentBlock?.key && lastBlock?.currentBlock?.key === block.prevBlock.key) {
                this.blockChain.push(block);
                return block;
            } else if (lastBlock?.nextBlock?.key !== block.currentBlock?.key) {
                const errConflict = new BlockConflict(nextNo, lastBlock?.nextBlock as BlockType, block.currentBlock as BlockType, block);
                throw Error(errConflict.toString());
            } else if (lastBlock?.currentBlock?.key !== block.prevBlock?.key) {
                const errConflict = new BlockConflict(nextNo - 1, lastBlock?.currentBlock as BlockType, block.prevBlock as BlockType, block);
                throw Error(errConflict.toString());
            }
        }
    }
}




export default BlockChain;
