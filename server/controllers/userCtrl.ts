import { Request, Response } from 'express'
import { IReqAuth } from '../config/interface'
import Users from '../models/userModel'
import bcrypt from 'bcrypt'

const userCtrl = {
    updateUser: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Chưa xác thực" })

        try {
            const { avatar, name } = req.body

            await Users.findOneAndUpdate({ _id: req.user._id }, {
                avatar, name
            })

            res.json({ msg: "Cập nhật thành công" })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },

    resetPassword: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Chưa xác thực" })

        try {
            const { password } = req.body
            const passwordHash = await bcrypt.hash(password, 12)

            await Users.findOneAndUpdate({ _id: req.user._id }, {
                password: passwordHash
            })

            res.json({ msg: "Cập nhật mật khẩu thành công" })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default userCtrl;
