import { Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getBlogsByUser } from '../../redux/actions/homeBlogsAction'
import { IBlog, IParams, RootStore } from '../../utils/TypeScript'
import CardBlog from '../cardBlog/CardBlog'
import PaginationComponent from '../pagination'

const UserBlogs = () => {
    const [blogs, setBlogs] = useState<IBlog[]>()
    const [total, setTotal] = useState(0)

    const user_id = useParams<IParams>().slug

    const dispatch = useDispatch()
    const { blogByUser } = useSelector((state: RootStore) => state)

    const history = useHistory()
    const { search } = history.location

    useEffect(() => {
        if (!user_id) return;

        if (blogByUser.every(item => item.id !== user_id)) {
            dispatch(getBlogsByUser(user_id, search))
        } else {
            const data = blogByUser.find(item => item.id === user_id)
            if (!data) return;

            setBlogs(data.blogs)
            setTotal(data.total)
            if (data.search) history.push(data.search)
        }
    }, [user_id, blogByUser, dispatch, search, history])

    const handlePagination = (page: number) => {
        const search = `?page=${page}`
        dispatch(getBlogsByUser(user_id, search))
    }

    if (!blogs) return <></>;

    if (blogs.length === 0 && total < 1) return (
        <h3>Chưa có bài đăng</h3>
    )

    return (
        <div>
            <CardBlog blogs={blogs} layout userBlog />
            <Row justify="end" style={{ marginTop: '20px' }}>
                {
                    <PaginationComponent total={total} callback={handlePagination} />
                }
            </Row>
        </div>
    )
}

export default UserBlogs
