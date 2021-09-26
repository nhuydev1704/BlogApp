import { CameraOutlined } from '@ant-design/icons';
import Avatar from '@material-ui/core/Avatar';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, resetPassword } from '../../redux/actions/profileAction';
import { InputChange, IUserProfile, RootStore } from '../../utils/TypeScript';
import FormInfo from '../auth/FormInfor';
const UserInfo = (props: any) => {

    const { auth } = useSelector((state: RootStore) => state);
    const [fileAvatar, setFileAvatar] = useState<IUserProfile | any>('');
    const dispatch = useDispatch();

    const handleSubmit = (data: any) => {
        const dataPush = { ...data, avatar: fileAvatar }
        const { name, avatar, password } = dataPush

        if (avatar || name !== auth?.user?.name)
            dispatch(updateUser((avatar as File), name, auth))

        if (password && auth.access_token)
            dispatch(resetPassword(password, auth.access_token))
    }

    // const {name, password, account, avatar, } = auth
    const handleChangeFile = (e: InputChange) => {
        const target = e.target as HTMLInputElement
        const files = target.files

        if (files) {
            const file = files[0]
            setFileAvatar(file)
        }
    }

    // if (!auth.user) return <NotFound />
    return (
        <Row justify="center">
            <Col span={24} style={{ textAlign: 'center', fontSize: '.8rem', marginTop: '6px', color: 'red' }}>
                {auth?.user?.type !== 'register' && `Bạn đang đăng nhập bằng ${auth?.user?.type} không thể đổi mật khẩu`}
            </Col>
            <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar alt="Remy Sharp"
                    src={fileAvatar ? URL.createObjectURL(fileAvatar) : auth?.user?.avatar}
                    className={`${props.classes.large} user_avatar`}
                />
                <span className="image_info">
                    <CameraOutlined style={{ fontSize: '26px', marginTop: '6px' }} />
                    <input type="file" accept="image/*"
                        name="file" id="file_up"
                        onChange={handleChangeFile} />
                </span>
            </Col>
            <Col span={24}>
                <Row justify="center">
                    <Col span={2} />

                    <Col span={20}>
                        <FormInfo handleSubmit={handleSubmit} />
                    </Col>
                    <Col span={2} />
                </Row>
            </Col>
        </Row>
    )
}

export default UserInfo
