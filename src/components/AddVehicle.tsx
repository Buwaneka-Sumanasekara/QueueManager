import React from 'react';
import { Col, Row, Layout, Button, Form, Input, Radio } from 'antd';
import { AddBlockInputProps } from '../types/blockTypes';
import { FormInstance } from 'antd/es/form/Form';

const { Header, Footer, Sider, Content } = Layout;

type AddVehicleProps = {
    onAddBlock: (v: AddBlockInputProps) => void,
    form: FormInstance
}

function AddVehicle(props: AddVehicleProps) {
    const { form } = props;

    const onFinish = (values: any) => {
        const v = values as AddBlockInputProps;
        props.onAddBlock(v);
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };




    return (<Form
        layout={"horizontal"}
        form={form}
        onFinish={onFinish}
        initialValues={{ remember: true }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item label="Previous Vehicle No" name="prevVehicle">
            <Input placeholder="Eg: XX-XXXX" />
        </Form.Item>
        <Form.Item label="Current Vehicle No" name="currentVehicle"
            rules={[{ required: true, message: 'Please input middle(your) vehicle number!' }]}>
            <Input placeholder="Eg: XX-XXXX" />
        </Form.Item>
        <Form.Item label="Next Vehicle No" name="nextVehicle">
            <Input placeholder="Eg: XX-XXXX" />
        </Form.Item>
        <Form.Item >
            <Button type="primary" htmlType="submit">
                Add
            </Button>
        </Form.Item>
    </Form>)
}

export default AddVehicle;
