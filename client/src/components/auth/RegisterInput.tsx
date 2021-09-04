import { TextField } from '@material-ui/core'
import React from 'react'

const RegisterInput = (props: any) => {
    return (
        <>
            <TextField {...props.register("name")} className={props.classes.input} id="standard-search2" label="Tên không quá 20 kí tự" type="search" />
            <TextField {...props.register("account")} className={props.classes.input} id="standard-search3" label="Email@gmail.com/+84123456789" type="search" />
            <TextField
                id="standard-password-input1"
                label="Mật khẩu"
                type="password"
                autoComplete="current-password"
                {...props.register("password")}
            />
            <TextField
                id="standard-password-input2"
                label="Xác nhận mật khẩu"
                type="password"
                autoComplete="current-password"
                {...props.register("cfpassword")}
            />
        </>
    )
}

export default RegisterInput
