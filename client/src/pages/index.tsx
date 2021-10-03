import { Col, Image, Row, Tooltip, Divider } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NotFound from '../components/global/NotFound'
import Loading from '../components/notification/Loading'
import { RootStore } from '../utils/TypeScript'
import moment from 'moment'
import Card from '@mui/material/Card';

const Home = () => {

    const { auth, homeBlogs } = useSelector((state: RootStore) => state);

    console.log(homeBlogs)

    return (
        <div>
            <Loading loadFull>
                {
                    homeBlogs && homeBlogs.length > 0 &&
                    homeBlogs.map((blog, index) => (
                        <div key={blog._id} style={{ margin: '40px 0' }}>
                            {
                                blog.count > 0 &&
                                <>
                                    <h3>
                                        <Link to={`/blogs/${(blog.name).toLowerCase()}`}>
                                            {(blog.name).toUpperCase()}
                                            <small style={{ fontSize: '.8rem' }}>
                                                ( Bài đăng:{blog.count} )
                                            </small>
                                        </Link>
                                    </h3>
                                    <Divider style={{ margin: 0, borderTop: '1px solid rgba(0, 0, 0, 0.4)' }} />
                                    <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
                                        {
                                            blog.blogs.map(item => (
                                                <Col xl={6} md={12} xs={24} lg={12} key={item._id}>
                                                    <Card style={{
                                                        padding: '16px',
                                                        border: '1px solid rgb(0 0 0 / 6%)',
                                                        borderBottom: 'none',
                                                        borderRadius: '10px',
                                                        background: 'rgb(245 245 245)'
                                                    }}>
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
                                                                    <Link to={`/profile/${item.user._id}`}>
                                                                        Tạo bởi: {item?.user?.name!}
                                                                    </Link>
                                                                </Col>
                                                                <Col
                                                                    span={10}
                                                                    style={{
                                                                        textAlign: 'right',
                                                                        color: '#aaa',
                                                                        fontSize: '.9rem'
                                                                    }}>
                                                                    {moment(item?.user?.createdAt).format("YYYY-MM-DD hh:mm:ss")}
                                                                </Col>
                                                            </Row>
                                                        }
                                                        <span
                                                            style={{
                                                                fontSize: '1rem'
                                                            }}>
                                                            {item.description.slice(0, 120)}...
                                                        </span>
                                                    </Card>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </>
                            }
                        </div>
                    ))
                }
            </Loading>
            <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, background: 'rgb(0 0 0 / 7%)', zIndex: -1 }}></div>
        </div>
    )
}

export default Home
