import { Request, Response } from "express"
import Users from "../models/userModel"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateActiveToken, generateAccessToken, generateRefreshToken } from "../config/generateToken"
import sendEmail from '../config/sendMail'
import { validateEmail } from "../middleware/valid"

const CLIENT_URL = `${process.env.BASE_URL}`

const authCtrl = {
    register: async (req: Request, res: Response) => {
        try {
            const { name, account, password } = req.body

            const user = await Users.findOne({ account })
            if (user) return res.status(400).json({ msg: "Tài khoản tồn tại." })

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                name, account, password: passwordHash
            }

            const active_token = generateActiveToken({ newUser })
            const url = `${CLIENT_URL}/active/${active_token}`

            if (validateEmail(account)) {
                sendEmail(account, url, 'Xác thực')
                return res.json({ msg: "Thành công! Hãy kiểm tra email của bạn." })
            }

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default authCtrl


