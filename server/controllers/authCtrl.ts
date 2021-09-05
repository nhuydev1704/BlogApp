import { Request, Response } from "express"
import Users from "../models/userModel"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateActiveToken, generateAccessToken, generateRefreshToken } from "../config/generateToken"
import sendEmail from '../config/sendMail'
import { validateEmail, validPhone } from "../middleware/valid"
import { sendSms, smsOTP, verifyOTP } from "../config/sendSMS"
import { IDecodedToken, IUser, IGgPayload, IUserParams } from "../config/interface"
import fetch from 'node-fetch'

import { OAuth2Client } from "google-auth-library"

const CLIENT_URL = `${process.env.local.BASE_URL}`

const client = new OAuth2Client(`${process.env.local.MAIL_CLIENT_ID}`)

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

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    activeAccount: async (req: Request, res: Response) => {
        try {
            const { active_token } = req.body

            const decoded = <IDecodedToken>jwt.verify(active_token, `${process.env.local.ACTIVE_TOKEN_SECRET}`)

            const { newUser } = decoded

            if (!newUser) return res.status(400).json({ msg: "Xác thực không hợp lệ." })

            const user = await Users.findOne({ account: newUser.account })
            if (user) return res.status(400).json({ msg: "Tài khoản tồn tại." })

            const new_user = new Users(newUser)

            await new_user.save()

            res.json({ msg: "Tài khoản đã được kích hoạt." })
        } catch (err: any) {

            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            const { account, password } = req.body

            const user = await Users.findOne({ account })
            if (!user) return res.status(400).json({ msg: "Tài khoản không tồn tại." })

            loginUser(user, password, res)

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req: Request, res: Response) => {
        try {
            res.clearCookie('refreshtoken', { path: `/api/refresh_token` })
            return res.json({ msg: "Đăng xuất thành công" })

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: async (req: Request, res: Response) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({ msg: "Hãy đăng nhập trước" })

            const decoded = <IDecodedToken>jwt.verify(rf_token, `${process.env.local.REFRESH_TOKEN_SECRET}`)
            if (!decoded.id) return res.status(400).json({ msg: "Hãy đăng nhập trước" })

            const user = await Users.findById(decoded.id).select("-password")
            if (!user) return res.status(400).json({ msg: "Tài khoản không tồn tại" })

            const access_token = generateAccessToken({ id: user._id })

            res.json({
                access_token,
                user
            })

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    googleLogin: async (req: Request, res: Response) => {
        try {
            const { id_token } = req.body

            const verify = await client.verifyIdToken({
                idToken: id_token, audience: `${process.env.local.MAIL_CLIENT_ID}`
            })

            const {
                email, email_verified, name, picture
            } = <IGgPayload>verify.getPayload()

            if (!email_verified) return res.status(400).json({ msg: "Xác thực email thất bại." })

            const password = email + 'your google secrect password'
            const passwordHash = await bcrypt.hash(password, 12)

            const user = await Users.findOne({ account: email })

            if (user) {
                loginUser(user, password, res)
            } else {
                const user = {
                    name, account: email, password: passwordHash, avatar: picture, type: 'login'
                }

                registerUser(user, res)
            }

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    facebookLogin: async (req: Request, res: Response) => {
        try {
            const { accessToken, userID } = req.body

            const URL = `
            https://graph.facebook.com/v3.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`

            const data = await fetch(URL)
                .then(res => res.json())
                .then(res => { return res })

            const { email, name, picture } = data

            const password = email + 'your facebook secrect password'
            const passwordHash = await bcrypt.hash(password, 12)

            const user = await Users.findOne({ account: email })

            if (user) {
                loginUser(user, password, res)
            } else {
                const user = {
                    name, account: email, password: passwordHash, avatar: picture.data.url, type: 'login'
                }

                registerUser(user, res)
            }

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    smsLogin: async (req: Request, res: Response) => {
        try {
            const { phone } = req.body
            const data = await smsOTP(phone, 'sms')

            res.json(data)
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    verifySms: async (req: Request, res: Response) => {
        try {
            const { phone, code } = req.body
            const data = await verifyOTP(phone, code)
            if (!data?.valid) return res.status(400).json({ msg: "Xác thực thất bại." });

            const password = phone + 'your phone secrect password'
            const passwordHash = await bcrypt.hash(password, 12)

            const user = await Users.findOne({ account: phone })

            if (user) {
                loginUser(user, password, res)
            } else {
                const user = {
                    name: '0'.concat(phone.slice(3)), account: phone, password: passwordHash, type: 'login'
                }
                registerUser(user, res)
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

const loginUser = async (user: IUser, password: string, res: Response) => {
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: "Mật khẩu không chính xác." })

    const access_token = generateAccessToken({ id: user._id })
    const refresh_token = generateRefreshToken({ id: user._id })

    res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: `/api/refresh_token`,
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
    })

    res.json({
        msg: 'Đăng nhập thành công',
        access_token,
        user: { ...user._doc, password: '' }
    })
}

const registerUser = async (user: IUserParams, res: Response) => {
    const newUser = new Users(user)
    await newUser.save()

    const access_token = generateAccessToken({ id: newUser._id })
    const refresh_token = generateRefreshToken({ id: newUser._id })

    res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: `/api/refresh_token`,
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
    })

    res.json({
        msg: 'Đăng nhập thành công',
        access_token,
        user: { ...newUser._doc, password: '' }
    })
}

export default authCtrl


