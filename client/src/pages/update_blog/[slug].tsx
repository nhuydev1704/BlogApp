import React from 'react'
import { useParams } from 'react-router'
import { IParams } from '../../utils/TypeScript'
import CreateBlog from '../create_blog'

const UpdateBlog = () => {
    const { slug } = useParams<IParams>()
    return (
        <div>
            <CreateBlog id={slug} />
        </div>
    )
}

export default UpdateBlog
