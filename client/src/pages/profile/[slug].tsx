import Card from '@material-ui/core/Card';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Col, Row } from 'antd';
import React from 'react';
import UserInfo from '../../components/profile/UserInfo';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IParams, RootStore } from '../../utils/TypeScript'
import OtherInfo from '../../components/profile/OtherInfo';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        large: {
            width: theme.spacing(17),
            height: theme.spacing(17),
            marginTop: '10px'
        },
        cardCustom: {
            border: '1px solid #ccc',
            width: '100%'
        }
    }),
);

const Profile = () => {
    const { slug }: IParams = useParams()
    const { auth } = useSelector((state: RootStore) => state)
    const classes = useStyles();

    return (
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
            <Col span={10}>
                <Card className={classes.cardCustom} variant="outlined">
                    {
                        !(auth.user?._id === slug)
                            ? <UserInfo classes={classes} />
                            : <OtherInfo />
                    }
                </Card>
            </Col>
            <Col span={14} >
                helo
            </Col>

        </Row>
    )
}

export default Profile
