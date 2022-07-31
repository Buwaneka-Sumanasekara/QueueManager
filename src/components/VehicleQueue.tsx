import Block from "../models/Block"
import { Avatar, List, Badge } from 'antd';
import { CarOutlined } from '@ant-design/icons';

type VehicleQueueProps = {
    list: Block[]
}

function VehicleQueue(props: VehicleQueueProps) {
    const { list } = props;


    return (
        <List
            itemLayout="horizontal"
            dataSource={list}
            renderItem={item => (
                <Badge.Ribbon placement={"end"} text={item.sequence}>
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar icon={<CarOutlined />} />}
                            title={item.currentBlock?.key}
                        />
                    </List.Item>
                </Badge.Ribbon>
            )}
        />
    )
}

export default VehicleQueue;
