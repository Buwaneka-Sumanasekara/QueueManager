import React from "react";
import Block from "../models/Block"
import { Avatar, List, Badge } from 'antd';
import { CarOutlined } from '@ant-design/icons';

type VehicleQueueProps = {
    list: Array<Block[]>
}

function TempVehicleQueues(props: VehicleQueueProps) {
    const { list } = props;


    return (
        <div>
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

export default TempVehicleQueues;
