import { Col, Image, Row } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NotFound from '../components/global/NotFound'
import Loading from '../components/notification/Loading'
import { RootStore } from '../utils/TypeScript'

const Home = () => {

    const { auth, homeBlogs } = useSelector((state: RootStore) => state);

    console.log(homeBlogs)

    return (
        <div>
            <Loading loadFull>
                {
                    homeBlogs && homeBlogs.length > 0 &&
                    homeBlogs.map((blog, index) => (
                        <div key={blog._id} style={{ marginTop: '40px' }}>
                            {
                                blog.count > 0 &&
                                <>
                                    <h3>
                                        <Link to={`/blogs/${(blog.name).toLowerCase()}`}>
                                            {blog.name} <small>{blog.count}</small>
                                        </Link>
                                    </h3>
                                    <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
                                        {
                                            blog.blogs.map(item => (
                                                <Col span={6} key={item._id}>
                                                    <h3>
                                                        <Link to={`/blog/${item._id}`}>
                                                            {item.title.slice(0, 26)}...
                                                        </Link>
                                                    </h3>
                                                    {
                                                        typeof (item.thumbnail) === 'string' &&
                                                        <Image
                                                            preview={false}
                                                            src={item.thumbnail}
                                                        />
                                                    }
                                                    {
                                                        typeof (item.user) !== 'string' &&
                                                        <Row>
                                                            <Col span={24}>
                                                                <Link to={`/profile/${item.user._id}`}>
                                                                    Tạo bởi: {item?.user?.name!}
                                                                </Link>
                                                            </Col>
                                                            <Col span={24} style={{ textAlign: 'right' }}>
                                                                {item?.user?.createdAt!}
                                                            </Col>
                                                        </Row>
                                                    }
                                                    <span
                                                        style={{
                                                            fontSize: '1rem'
                                                        }}>
                                                        {item.description.slice(0, 120)}...
                                                    </span>
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
        </div>
    )
}

export default Home
