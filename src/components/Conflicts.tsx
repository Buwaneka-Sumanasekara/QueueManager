import Block from "../models/Block"

type ConflictBlocksProps = {
    list: Map<string, { org: Block, tem: Block }> | undefined
}


function getComponents(list: Map<string, { org: Block, tem: Block }>) {
    const comps: any = [];
    list.forEach((value, key) => comps.push(<li key={`conf_${key}`}>{`${value.org} vs ${value.tem}`}</li>));
    return comps;
}

function ConflictBlocks(props: ConflictBlocksProps) {
    const { list } = props;


    if (list && list.size > 0) {
        return (
            <div>
                <p>{"Conflicts"}</p>
                {getComponents(list)}
            </div>
        )
    }
    return null

}

export default ConflictBlocks;
