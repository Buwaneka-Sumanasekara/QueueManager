import React from "react";
import { BlockType } from "../types/blockTypes";
import Block from "./Block";
import BlockConflict from "./BlockConflict";


type TemBlockChainPosition = {
    parentIndex: number,
    replacement: Block[]
}

class BlockChain {

    private blockChain: Block[] = [];

    private temBlockChains: Array<Block[]> = [];

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

    getTemporaryLists(): Array<Block[]> {
        return this.temBlockChains;
    }

    private validateBlock(block: Block): boolean {
        let state = true;
        if (block.currentBlock?.key === block.nextBlock?.key) {
            state = false;
            throw Error(`Invalid input, block values cannot be equal ${block}`);
        } else if (block.currentBlock?.key === block.prevBlock?.key) {
            state = false;
            throw Error(`Invalid input, block values cannot be equal ${block}`);
        } else if ((block.nextBlock !== null && block.prevBlock !== null) && block.nextBlock?.key === block.prevBlock?.key) {
            state = false;
            throw Error(`Invalid input, block values cannot be equal ${block}`);
        }

        return state;
    }

    private addFirstBlock(block: Block, forceReplace: boolean = false) {
        if (block.prevBlock === null) {
            block.sequence = 1;
            if (this.blockChain.length === 0) {
                this.blockChain.push(block);
                if (block.nextBlock) {
                    const nextBlock: Block = {
                        prevBlock: block.currentBlock,
                        currentBlock: block.nextBlock,
                        nextBlock: null,
                        sequence: block.sequence + 1,
                    }
                    this.blockChain.push(nextBlock);
                }
            } else if (forceReplace) {
                this.blockChain[0] = block;
            }
        } else {
            throw new Error("There is no previous block for the first block");
        }

    }

    addToBlockChainNextPosition(block: Block) {
        if (this.validateBlock(block)) {
            if (block.prevBlock === null) {
                return this.addFirstBlock(block);
            } else {
                const lastBlock = this.getLastBlock();
                const nextNo = this.blockChain.length + 1;

                if (lastBlock?.currentBlock?.key === block.prevBlock.key) {
                    block.sequence = nextNo
                    this.blockChain.push(block);

                    if (block.nextBlock) {
                        const nextBlock: Block = {
                            prevBlock: block.currentBlock,
                            currentBlock: block.nextBlock,
                            nextBlock: null,
                            sequence: block.sequence + 1,
                        }
                        this.blockChain.push(nextBlock);
                    }

                    return block;
                } else if (lastBlock?.nextBlock === null && (block.prevBlock !== null && lastBlock.currentBlock?.key == block.prevBlock.key)) {

                    const updatedLastBlock: Block = {
                        ...lastBlock,
                        nextBlock: { key: block.currentBlock?.key as string }
                    }
                    this.blockChain.splice(this.blockChain.length - 1, 1, updatedLastBlock);

                    block.sequence = nextNo
                    this.blockChain.splice(this.blockChain.length, 0, block);
                    return block;
                } else {
                    this.addToTempBlockChain(block);

                }
                this.reArrangeCurrentBlockChainsWithTempLists()
                /*
                else if (lastBlock?.nextBlock?.key !== block.currentBlock?.key) {
                    this.addToTempBlockChain(block);
                    // const errConflict = new BlockConflict("current", nextNo, lastBlock?.nextBlock as BlockType, block.currentBlock as BlockType, block);
                    // throw Error(errConflict.toString());
                } else if (lastBlock?.currentBlock?.key !== block.prevBlock.key) {
                    // const errConflict = new BlockConflict("previous", nextNo - 1, lastBlock?.currentBlock as BlockType, block.prevBlock as BlockType, block);
                    // throw Error(errConflict.toString());
                    this.addToTempBlockChain(block);
                }
                */
            }
        }
    }


    reArrangeCurrentBlockChainsWithTempLists() {
        for (let i = 0; i < this.temBlockChains.length; i++) {

            const currentTemBlockChain: Block[] = this.temBlockChains[i];

            const lastBlockOrg = this.blockChain[this.blockChain.length - 1];
            const lastBlockTemBlockchain = currentTemBlockChain[currentTemBlockChain.length - 1];

            if (lastBlockOrg.nextBlock?.key === lastBlockTemBlockchain.currentBlock?.key) {
                //add to list tail
                this.blockChain.push(...currentTemBlockChain);
                this.temBlockChains.splice(i, 1);
            } if (lastBlockOrg.currentBlock?.key === lastBlockTemBlockchain.prevBlock?.key) {
                //add to list tail
                this.blockChain = this.blockChain.concat(currentTemBlockChain);
                this.temBlockChains.splice(i, 1);
            }
        }
    }




    /*Tempory lists*/

    addToTempBlockChain(block: Block) {
        if (this.temBlockChains.length === 0) {
            const temBlockChain = [block];
            this.temBlockChains.push(temBlockChain);
        } else {
            const createTemBlockChain = this.findSequenceInTemBlockChain(block);
            console.log("updatedTemBlockChain", createTemBlockChain)
            if (createTemBlockChain) {
                const newPosition = { parentIndex: this.temBlockChains.length, replacement: [block] } as TemBlockChainPosition;
                this.addTempBlockChain(newPosition);
            }

            this.reArrangeTempBlockChains()
        }
    }

    updateTempBlockChain(temBlockChainPosition: TemBlockChainPosition) {
        this.temBlockChains.splice(temBlockChainPosition.parentIndex, 1, temBlockChainPosition.replacement);
    }
    addTempBlockChain(temBlockChainPosition: TemBlockChainPosition) {
        this.temBlockChains.splice(temBlockChainPosition.parentIndex, 0, temBlockChainPosition.replacement);
    }

    findSequenceInTemBlockChain(block: Block): boolean | undefined {
        for (let i = 0; i < this.temBlockChains.length; i++) {
            const temBlockChain: Block[] = this.temBlockChains[i];

            //check passed block is after first block
            const firstBlock = temBlockChain[0];
            if (block.prevBlock?.key === firstBlock.currentBlock?.key) {
                temBlockChain.splice(1, 0, block);
                this.updateTempBlockChain({ parentIndex: i, replacement: temBlockChain })
                return;
            } else if (block.currentBlock?.key === firstBlock.prevBlock?.key) {
                temBlockChain.splice(0, 0, block);
                this.updateTempBlockChain({ parentIndex: i, replacement: temBlockChain })
                return;
            }


            //check passed block is after last block
            const lastBlock = temBlockChain[temBlockChain.length - 1];
            if (block.prevBlock?.key === lastBlock.currentBlock?.key) {
                temBlockChain.splice(temBlockChain.length, 0, block);
                this.updateTempBlockChain({ parentIndex: i, replacement: temBlockChain })
                return;
            } else if (block.currentBlock?.key === lastBlock.prevBlock?.key) {
                temBlockChain.splice(temBlockChain.length - 1, 0, block);
                this.updateTempBlockChain({ parentIndex: i, replacement: temBlockChain })
                return;
            } else if (block.currentBlock?.key === lastBlock.nextBlock?.key) {
                temBlockChain.splice(temBlockChain.length - 1, 0, block);
                this.updateTempBlockChain({ parentIndex: i, replacement: temBlockChain })
                return;
            }
        }

        return true;
    }



    reArrangeTempBlockChains() {
        for (let i = 0; i < this.temBlockChains.length - 1; i++) {
            for (let j = 0; j < this.temBlockChains.length - i - 1; j++) {
                const currentTemBlockChain: Block[] = this.temBlockChains[j];
                const nextTemBlockChain: Block[] = this.temBlockChains[j + 1];

                console.log(currentTemBlockChain, nextTemBlockChain);
                const lastBlockOfCurrentBlockChain = currentTemBlockChain[currentTemBlockChain.length - 1];
                const firstBlockOfNextBlockChain = nextTemBlockChain[0];

                if (lastBlockOfCurrentBlockChain.currentBlock?.key === firstBlockOfNextBlockChain.prevBlock?.key) {
                    const nextChain = currentTemBlockChain.concat(nextTemBlockChain);

                    //replace 
                    this.temBlockChains.splice(j, 1, nextChain);

                    //remove
                    this.temBlockChains.splice(j + 1, 1);
                } else if (lastBlockOfCurrentBlockChain.currentBlock?.key === firstBlockOfNextBlockChain.nextBlock?.key) {
                    const nextChain = nextTemBlockChain.concat(currentTemBlockChain);

                    //replace 
                    this.temBlockChains.splice(j, 1, nextChain);

                    //remove
                    this.temBlockChains.splice(j + 1, 1);
                }
            }
        }
    }

}




export default BlockChain;
