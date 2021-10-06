import { Response, Request } from 'express'
import Blogs from '../models/blogModel'
import { IReqAuth } from '../config/interface'
import mongoose from 'mongoose'

const Pagination = (req: IReqAuth) => {
    let page = Number(req.query.page) * 1 || 1;
    let limit = Number(req.query.limit) * 1 || 4;
    let skip = (page - 1) * limit;

    return {page, limit, skip};
}

const blogCtrl = {
    createBlog: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Chưa xác thực." })

        try {
            const { title, content, description, thumbnail, category } = req.body;

            const newBlog = new Blogs({
                user: req.user._id,
                title,
                content,
                description,
                thumbnail,
                category
            })

            await newBlog.save()
            res.json({ newBlog })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getHomeBlog: async (req: Request, res: Response) => {
        try {
            const blogs = await Blogs.aggregate([
                //User
                {
                    $lookup: {
                        from: "users",
                        let: { user_id: "$user" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                            { $project: { password: 0 } }
                        ],
                        as: "user"
                    }
                },
                // array -> object
                { $unwind: "$user" },

                // category
                {
                    $lookup: {
                        from: "categories",
                        "localField": "category",
                        "foreignField": "_id",
                        "as": "category"
                    }
                },
                { $unwind: "$category" },

                // sort 
                { $sort: { "createdAt": -1 } },
                // groupby category
                {
                    $group: {
                        _id: "$category._id",
                        name: { $first: "$category.name" },
                        blogs: {
                            $push: "$$ROOT"
                        },
                        count: { $sum: 1 }
                    }
                },
                // pagination
                {
                    $project: {
                        blogs: {
                            $slice: ['$blogs', 0, 4]
                        },
                        count: 1,
                        name: 1
                    }
                }
            ])

            res.json(blogs)
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getBlogByCategory: async (req: Request, res: Response) => {
        const {limit, skip } = Pagination(req)

        try {
            const Data = await Blogs.aggregate([
            {
                $facet: {
                    totalData: [
                        {
                            $match: {category: mongoose.Types.ObjectId(req.params.id)}
                        },
                        //User
                        {
                            $lookup: {
                                from: "users",
                                let: { user_id: "$user" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                                    { $project: { password: 0 } }
                                ],
                                as: "user"
                            }
                        },
                        // array -> object
                        { $unwind: "$user" },
                        // sort
                        {
                            $sort: {createdAt: -1}
                        },
                        {
                            $skip: skip
                        },
                        {
                            $limit: limit
                        }
                    ],
                    totalCount: [
                        {
                            $match: {
                                category: mongoose.Types.ObjectId(req.params.id)
                            }
                        },
                        {
                            $count: 'count'
                        }
                    ]
                }
            },
            {
                $project:{
                    count: {$arrayElemAt: ["$totalCount.count", 0]},
                    totalData: 1
                }
            }
            ])

            const blogs = Data[0].totalData;
            const count = Data[0].count;

            // pagination
            let total = 0;

            if(count % limit === 0) {
                total = count / limit;
            }else {
                total = Math.floor(count / limit) + 1;
            }

            res.json({blogs, total})

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getBlogByUser: async (req: Request, res: Response) => {
        const {limit, skip } = Pagination(req)

        try {
            const Data = await Blogs.aggregate([
            {
                $facet: {
                    totalData: [
                        {
                            $match: {user: mongoose.Types.ObjectId(req.params.id)}
                        },
                        //User
                        {
                            $lookup: {
                                from: "users",
                                let: { user_id: "$user" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                                    { $project: { password: 0 } }
                                ],
                                as: "user"
                            }
                        },
                        // array -> object
                        { $unwind: "$user" },
                        // sort
                        {
                            $sort: {createdAt: -1}
                        },
                        {
                            $skip: skip
                        },
                        {
                            $limit: limit
                        }
                    ],
                    totalCount: [
                        {
                            $match: {
                                user: mongoose.Types.ObjectId(req.params.id)
                            }
                        },
                        {
                            $count: 'count'
                        }
                    ]
                }
            },
            {
                $project:{
                    count: {$arrayElemAt: ["$totalCount.count", 0]},
                    totalData: 1
                }
            }
            ])

            const blogs = Data[0].totalData;
            const count = Data[0].count;

            // pagination
            let total = 0;

            if(count % limit === 0) {
                total = count / limit;
            }else {
                total = Math.floor(count / limit) + 1;
            }

            res.json({blogs, total})

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default blogCtrl;
