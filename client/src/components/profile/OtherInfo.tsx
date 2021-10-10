import Avatar from '@mui/material/Avatar'
import { Col, Row } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOtherUser } from '../../redux/actions/profileAction'
import { IUser, RootStore } from '../../utils/TypeScript'

const OtherInfo = (props: any) => {
    const [other, setOther] = useState<IUser>()

    const dispatch = useDispatch()

    const { otherInfo } = useSelector((state: RootStore) => state)

    useEffect(() => {
        if (!props.id) return;

        if (otherInfo.every(user => user._id !== props.id)) {
            dispatch(getOtherUser(props.id))
        } else {
            const newUser = otherInfo.find(user => user._id === props.id)
            if (newUser) setOther(newUser)
        }
    }, [props.id, otherInfo, dispatch])

    return (
        other ? (
            <Row justify="center">
                <Col span={24} className="item-center other_user-avatar">
                    <Avatar
                        alt="orther user"
                        src={other.avatar}
                        sx={{ width: 200, height: 200 }}
                    />
                </Col>
                <Col span={24} className="item-center other_user-role">
                    {other.role}
                </Col>
                <Col span={24} className="item-center other_user-user">
                    {other.account}
                </Col>
                <Col span={24} className="item-center other_user-join">
                    Ngày gia nhập: {moment(other.createdAt).format("YYYY-MM-DD hh:mm:ss")}
                </Col>
            </Row>
        ) : <></>
    )
}

export default OtherInfo
