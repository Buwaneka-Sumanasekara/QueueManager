
import React, { useRef, useState } from 'react';
import { Form } from 'antd';
import AddVehicle from '../../components/AddVehicle';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BlockChain from '../../models/BlockChain';
import Block from '../../models/Block';
import { AddBlockInputProps, BlockType } from '../../types/blockTypes';
import VehicleQueue from '../../components/VehicleQueue';
import TempVehicleQueues from '../../components/TemporaryQueue';
import ConflictBlocks from '../../components/Conflicts';


function HomePage() {
    const [form] = Form.useForm();

    const queueRef = useRef(new BlockChain());

    const [vehicleList, setVehicleList] = useState<Block[]>([]);
    const [temVehicleList, setTemVehicleList] = useState<Array<Block[]>>([]);
    const [conflictList, setConflictList] = useState<Map<string, { org: Block, tem: Block }>>();

    function onAddBlock(input: AddBlockInputProps) {

        try {
            const prevVehicle = (input.prevVehicle ? { key: input.prevVehicle } : null)
            const currentVehicle = (input.currentVehicle ? { key: input.currentVehicle } : null)
            const nextVehicle = (input.nextVehicle ? { key: input.nextVehicle } : null)

            queueRef.current.addToBlockChainNextPosition(new Block(prevVehicle, currentVehicle as BlockType, nextVehicle));

            form.resetFields();

            const list = queueRef.current.getCurrentList();
            setVehicleList([...list])

            const temList = queueRef.current.getTemporaryLists();
            setTemVehicleList([...temList]);

            const conflictList = queueRef.current.getConflictLists();
            setConflictList(conflictList);
        } catch (er: any) {
            console.log(er.message);
        }
    }

    return (
        <Container className='fill'>
            <Row>
                <Col md={4} className={"py-4"}>
                    <AddVehicle onAddBlock={onAddBlock} form={form} />
                </Col>
                <Col md={4} className={"px-4"}>
                    <VehicleQueue list={vehicleList} />
                </Col>
                <Col md={2} className={"px-4"}>
                    <TempVehicleQueues list={temVehicleList} />
                </Col>
                <Col md={2} className={"px-4"}>
                    <ConflictBlocks list={conflictList} />
                </Col>
            </Row>
        </Container>
    )

}

export default HomePage;
