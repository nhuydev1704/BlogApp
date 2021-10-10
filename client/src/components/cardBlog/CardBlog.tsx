import Card from '@mui/material/Card'
import { Col, Row, Tooltip, Button, Space, Popconfirm, notification } from 'antd'
import { get } from 'lodash'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, IUser } from '../../utils/TypeScript'
import NotFound from '../global/NotFound'
import { DeleteTwoTone } from '@ant-design/icons';
import { deleteBlog } from '../../redux/actions/homeBlogsAction'

const CardBlog = (props: any) => {
    const blogs = get(props, 'blogs', [])
    const userBlog = get(props, 'userBlog', false)

    const { auth } = useSelector((state: RootStore) => state)
    const dispatch = useDispatch()

    const handleDeleteBlog = (blog: any) => {
        if (!auth.user || !auth.access_token) return;

        if (blog.user._id !== auth.user._id) return notification['warning']({
            message: "Blog Nguyễn Như Ý",
            description: "Chưa xác thực",
        });

        dispatch(deleteBlog(blog, auth.access_token))
    }

    if (!auth) return <NotFound />
    return (
        <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
            {
                blogs && blogs.length > 0 && blogs.map((item: any) => (
                    <Col xl={props.layout ? 12 : 6}
                        md={props.layout ? 24 : 12}
                        xs={24} lg={props.layout ? 24 : 12}
                        key={item._id}
                    >
                        <Card
                            style={{
                                padding: '16px',
                                border: '1px solid rgb(0 0 0 / 6%)',
                                borderBottom: 'none',
                                borderRadius: '10px',
                                background: 'rgb(245 245 245)',
                                minHeight: '366px',
                                height: '366px'
                            }}

                        >
                            <h3>
                                <Tooltip placement="top" title={item.title}>
                                    <Link
                                        to={`/blog/${item._id}`}
                                    >
                                        {item.title.slice(0, 26)}...
                                        {
                                            typeof (item.thumbnail) === 'string' &&
                                            <img
                                                src={`${item.thumbnail}`}
                                                className="style_img-homeblogs"
                                                alt="thumbnail"
                                            />
                                        }
                                    </Link>
                                </Tooltip>
                            </h3>
                            {
                                typeof (item.user) !== 'string' &&
                                <Row
                                    gutter={[0, 16]}
                                    style={{ marginTop: '4px' }}
                                >
                                    <Col span={14}>
                                        {
                                            item.user &&
                                            <Link to={`/profile/${item.user._id}`}>
                                                Tạo bởi: {item?.user?.name!}
                                            </Link> 
                                        }
                                    </Col>
                                    <Col
                                        span={10}
                                        style={{
                                            textAlign: 'right',
                                            color: '#aaa',
                                            fontSize: '.9rem'
                                        }}>
                                        {
                                            moment(item?.createdAt).format("YYYY-MM-DD hh:mm:ss")
                                        }
                                    </Col>
                                </Row>
                            }
                            <span
                                style={{
                                    fontSize: '1rem',
                                    marginBottom: '6px'
                                }}>
                                {item.description.slice(0, 90)}...
                            </span>
                            {
                                auth && auth.user && userBlog && (item.user as IUser)?._id === (auth.user as IUser)?._id &&
                                <Row justify="end" align="bottom">
                                    <Space>
                                        <Link to={`/update_blog/${item._id}`}>
                                            <Button type="primary">
                                                Chỉnh sửa
                                            </Button>
                                        </Link>
                                        <Popconfirm
                                            placement="top"
                                            title="Bạn chắc chứ?"
                                            onConfirm={() => handleDeleteBlog(item)}
                                            onCancel={() => console.log('')}
                                            okText="Đồng ý"
                                            cancelText="Hủy"
                                        >
                                            <Tooltip title="Xóa" placement="top">
                                                <Button shape="circle" icon={<DeleteTwoTone />} />
                                            </Tooltip>
                                        </Popconfirm>

                                    </Space>
                                </Row>
                            }
                        </Card>
                    </Col>
                ))
            }
        </Row >
    )
}

export default CardBlog