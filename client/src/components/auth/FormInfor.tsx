import {
    Form,
    Input,
    Button
} from 'antd';
import React from 'react';
import { useSelector } from 'react-redux'

import { RootStore } from '../../utils/TypeScript'

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
    },
};

const FormInfo = (props: any) => {
    const { auth } = useSelector((state: RootStore) => state)
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        const { confirm, ...rest } = values
        props.handleSubmit(rest)
    };
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            layout="vertical"
        >
            <Form.Item style={{ marginBottom: '6px' }}
                label="Họ tên"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Hãy nhập họ tên!',
                    },
                ]}
                initialValue={auth?.user?.name}
            >
                <Input />
            </Form.Item>
            <Form.Item style={{ marginBottom: '6px' }}
                name="account"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'Không đúng định dạng Email!',
                    },
                    {
                        required: true,
                        message: 'Hãy nhập email!',
                    },
                ]}
                initialValue={auth?.user?.account}
            >
                <Input />
            </Form.Item>

            <Form.Item style={{ marginBottom: '6px' }}
                name="password"
                label="Mật khẩu"
                rules={[
                    {
                        message: 'Hãy nhập mật khẩu!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password disabled={auth?.user?.type === 'register' ? false : true} />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Xác nhận mật khẩu"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        message: 'Hãy xác nhận mật khẩu xác thực!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Mật khẩu xác nhận không chính xác!'));
                        },
                    }),
                ]}
            >
                <Input.Password disabled={auth?.user?.type === 'register' ? false : true} />
            </Form.Item>
            <Form.Item>
                <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                    Cập nhật
                </Button>
            </Form.Item>
        </Form>
    )
}

export default FormInfo
