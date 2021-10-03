import { Response, Request } from 'express'
import Blogs from '../models/blogModel'
import { IReqAuth } from '../config/interface'

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
    }
}

export default blogCtrl;
