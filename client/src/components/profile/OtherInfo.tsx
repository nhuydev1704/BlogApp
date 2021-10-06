import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getOtherUser} from '../../redux/actions/profileAction'
import {RootStore, IUser} from '../../utils/TypeScript'
import Loading from '../../components/notification/Loading'
import {Row, Col} from 'antd'
import Avatar from '@mui/material/Avatar';
import moment from 'moment'

interface IProps {
    id: any,
}

const OtherInfo = (props: any) => {
    const [other, setOther] = useState<IUser>()

    const dispatch = useDispatch()

    const {otherInfo} = useSelector((state: RootStore) => state)

    useEffect(() => {
        if(!props.id) return;

        if(otherInfo.every(user => user._id !== props.id)){
            dispatch(getOtherUser(props.id))
        }else {
            const newUser = otherInfo.find(user => user._id === props.id)
            if(newUser) setOther(newUser)
        }
    }, [props.id, otherInfo, dispatch])

    console.log('otherInfo', otherInfo)
    return (
        other ? (
            <Row  justify="center">        
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
