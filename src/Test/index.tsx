import { useCallback, useEffect, useState } from "react"
import Block from "../models/Block";
import BlockChain from "../models/BlockChain";
import { BlockType } from "../types/Block";


function BlockChainTest() {

    const [list, setList] = useState<Block[]>([]);

    useEffect(() => {
        createBlockChain();
    }, [])

    const createBlockChain = useCallback(() => {
        let bc = new BlockChain();
        bc.addToBlockChainNextPosition(new Block(null, { key: "A" }, { key: "B" }));
        bc.addToBlockChainNextPosition(new Block({ key: "A" }, { key: "B" }, { key: "C" }));
        bc.addToBlockChainNextPosition(new Block({ key: "B" }, { key: "C" }, { key: "D" }));
        bc.addToBlockChainNextPosition(new Block({ key: "C" }, { key: "D" }, { key: "E" }));


        const blockChain = bc.getCurrentList();

        setList(blockChain);
    }, [])

    return (<div>

        {list.map(v => (
            <p key={`key${v.sequence}`}>{v.sequence} -  {v.currentBlock?.key}</p>
        ))}
    </div>)
}


export default BlockChainTest;
