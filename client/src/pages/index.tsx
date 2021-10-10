import { Button, Divider } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CardBlog from '../components/cardBlog/CardBlog'
import Loading from '../components/notification/Loading'
import { IBlog, RootStore } from '../utils/TypeScript'

const Home: React.FC<IBlog | any> = () => {

    const { homeBlogs } = useSelector((state: RootStore) => state);

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
                                    <CardBlog blogs={blog.blogs} />
                                </>
                            }
                            {
                                blog.count > 4 &&
                                <Link to={`/blogs/${(blog.name).toLowerCase()}`}>
                                    <Button type="link" block style={{ textAlign: 'right', marginTop: '4px' }}>
                                        Xem tất cả...
                                    </Button>
                                </Link>
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
