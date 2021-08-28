import { Request, Response } from "express"
import Users from "../models/userModel"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateActiveToken, generateAccessToken, generateRefreshToken } from "../config/generateToken"
import sendEmail from '../config/sendMail'
import { validateEmail, validPhone } from "../middleware/valid"
import { sendSms } from "../config/sendSMS"
import { IDecodedToken } from "../config/interface"

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
            } else if (validPhone(account)) {
                sendSms(account, url, "Xác thực")
                return res.json({ msg: "Thành công! Hãy kiểm tra điện thoại của bạn." })
            }

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    activeAccount: async (req: Request, res: Response) => {
        try {
            const { active_token } = req.body

            const decoded = <IDecodedToken>jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)

            const { newUser } = decoded

            if (!newUser) return res.status(400).json({ msg: "Xác thực không hợp lệ." })

            const user = new Users(newUser)

            await user.save()

            res.json({ msg: "Tài khoản đã được kích hoạt." })
        } catch (err) {
            let errMsg;
            if (err.code === 11000) {
                errMsg = Object.keys(err.keyValue)[0] + " đã tồn tại."
            } else {
                let name = Object.keys(err.errors)[0]
                errMsg = err.errors[`${name}`].message
            }
            return res.status(500).json({ msg: errMsg })
        }
    }
}

export default authCtrl


