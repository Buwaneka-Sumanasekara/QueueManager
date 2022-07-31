

export interface BlockType {
    key: string,
}

export enum BlockPosition {
    previous = "previous",
    current = "current",
    last = "last"
}

export type AddBlockInputProps = {
    currentVehicle: string,
    nextVehicle: string,
    prevVehicle: string
}


