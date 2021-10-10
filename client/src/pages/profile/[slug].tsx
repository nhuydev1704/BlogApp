import Card from '@material-ui/core/Card';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../components/notification/Loading';
import OtherInfo from '../../components/profile/OtherInfo';
import UserBlogs from '../../components/profile/UserBlogs';
import UserInfo from '../../components/profile/UserInfo';
import { IParams, RootStore } from '../../utils/TypeScript';


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
        <Loading loadFull>
            <Row gutter={[16, 16]} style={{ margin: '30px 0' }}>
                <Col span={10} style={{ marginTop: '10px' }}>
                    <Card className={classes.cardCustom} variant="outlined">
                        {
                            (auth.user?._id === slug)
                                ? <UserInfo classes={classes} />
                                : <OtherInfo id={slug} />
                        }
                    </Card>
                </Col>
                <Col span={14}  >
                    <UserBlogs />
                </Col>
            </Row>
        </Loading>
    )
}

export default Profile
