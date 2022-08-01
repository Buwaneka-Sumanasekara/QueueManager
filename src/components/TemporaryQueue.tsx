import Block from "../models/Block"

type VehicleQueueProps = {
    list: Array<Block[]>
}

function TempVehicleQueues(props: VehicleQueueProps) {
    const { list } = props;

    if (list.length > 0) {
        return (
            <div>
                <p>{"Temp Queue"}</p>
                <ul>
                    {list.map((subList, index) => (
                        <li key={`parent${index}`}>
                            <ul >
                                {subList.map((v, subIndex) => (
                                    <li key={`sub${subIndex}`}>{`${v}`}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
    return null
}

export default TempVehicleQueues;
