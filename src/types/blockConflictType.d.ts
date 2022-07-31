import Block from "../models/Block";
export interface BlockConflictType {
    position: number,
    conflictWith: Block,
    block: Block,
}
