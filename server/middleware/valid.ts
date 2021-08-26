import { Request, Response, NextFunction } from 'express'

export const validRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { name, account, password } = req.body

    if (!name) {
        return res.status(400).json({ msg: "Hãy nhập tên." })
    } else if (name.lenth > 20) {
        return res.status(400).json({ msg: "Tên không quá 20 kí tự." })
    }

    if (!account) {
        return res.status(400).json({ msg: "Hãy nhập tài khoản." })
    } else if (!validPhone(account) && !validateEmail(account)) {
        return res.status(400).json({ msg: "Nhập đúng định dạng email hoặc số điện thoại." })
    }

    if (password.length < 6) {
        return res.status(400).json({ msg: "Mật khẩu tối thiểu 6 kí tự." })
    }

    next();
}

function validPhone(phone: string) {
    const re = /^[+]/g
    return re.test(phone)
}

function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}