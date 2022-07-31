
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


function HomePage() {
    const [form] = Form.useForm();

    const queueRef = useRef(new BlockChain());

    const [vehicleList, setVehicleList] = useState<Block[]>([]);


    function onAddBlock(input: AddBlockInputProps) {

        try {
            const prevVehicle = (input.prevVehicle ? { key: input.prevVehicle } : null)
            const currentVehicle = (input.currentVehicle ? { key: input.currentVehicle } : null)
            const nextVehicle = (input.nextVehicle ? { key: input.nextVehicle } : null)

            queueRef.current.addToBlockChainNextPosition(new Block(prevVehicle, currentVehicle as BlockType, nextVehicle));

            form.resetFields();

            const list = queueRef.current.getCurrentList();
            setVehicleList([...list])
        } catch (er: any) {
            console.log(er.message);
        }
    }

    console.log("vehicleList", vehicleList);
    return (
        <Container className='fill'>
            <Row>
                <Col md={4} className={"py-4"}>
                    <AddVehicle onAddBlock={onAddBlock} form={form} />
                </Col>
                <Col md={8} className={"px-4"}>
                    <VehicleQueue list={vehicleList} />
                </Col>
            </Row>
        </Container>
    )

}

export default HomePage;
