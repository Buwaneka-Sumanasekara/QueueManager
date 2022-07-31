import Block from "../models/Block";

export interface BlockType {
    key: string,
}

export enum BlockPosition {
    previous = "previous",
    mid = "mid",
    last = "last"
}

export interface BlockConflictType {
    position: number,
    conflictWith: Block,
    block: Block,
}


