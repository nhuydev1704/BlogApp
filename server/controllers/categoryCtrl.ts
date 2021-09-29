
import { Request, Response } from 'express'
import Categories from '../models/categoryModel'
import { IReqAuth } from '../config/interface'


const categoryCtrl = {
    createCategory: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Chưa xác thực" })

        if (req.user.role !== 'admin') res.status(400).json({ msg: "Bạn không phải admin" })

        try {
            const name = req.body.name.toLowerCase()

            const newCategory = new Categories({ name })
            await newCategory.save()

            res.json({ newCategory })
        } catch (err: any) {
            let errMsg;

            if (err.code === 11000) {
                errMsg = Object.values(err.keyValue)[0] + " đã tồn tại."
            } else {
                let name = Object.keys(err.errors)[0]
                errMsg = err.errors[`${name}`].message
            }
            return res.status(500).json({ msg: errMsg })
        }
    },

    getCategory: async (req: IReqAuth, res: Response) => {
        try {
            const categories = await Categories.find().sort("-createAt")
            res.json({ categories })
        } catch (err: any) {

            return res.status(500).json({ msg: err.message })
        }
    },

    updateCategory: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Chưa xác thực" })

        if (req.user.role !== 'admin') res.status(400).json({ msg: "Bạn không phải admin" })
        try {
            await Categories.findOneAndUpdate({
                _id: req.params.id
            }, { name: req.body.name })

            res.json({ msg: "Cập nhật thành công." })
        } catch (err: any) {

            return res.status(500).json({ msg: err.message })
        }
    },

    deleteCategory: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Chưa xác thực" })

        if (req.user.role !== 'admin') res.status(400).json({ msg: "Bạn không phải admin" })
        try {

            await Categories.findByIdAndRemove(req.params.id)

            res.json({ msg: "Xóa thành công." })
        } catch (err: any) {

            return res.status(500).json({ msg: err.message })
        }
    },
}

export default categoryCtrl;