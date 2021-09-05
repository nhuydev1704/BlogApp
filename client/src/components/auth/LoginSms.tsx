import { TextField } from '@material-ui/core'
import React from 'react'

const LoginSms = (props: any) => {

    return (
        <>
            <TextField
                id="standard-password-input5"
                label="Số điện thoại"
                type="search"
                autoComplete="current-password"
                {...props.register("account")}
            />
            <TextField
                id="standard-password-input99"
                label=""
                type="search"
                value="sms"
                autoComplete="current-password"
                {...props.register("type")}
                hidden
            />
        </>
    )
}

export default LoginSms
