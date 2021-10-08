import { Button, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import RegisterInput from '../components/auth/RegisterInput';
import Loading from '../components/notification/Loading';
import { notification } from 'antd';
import { registerUser } from '../redux/actions/authAction';

type InputRegister = {
    name: string
    account: string
    password: string
    cfpassword: string
};

const useStyles = makeStyles({
    root2: {
        flexGrow: 1,
    },
    root: {
        minWidth: 420,
        borderRadius: '10px'
    },
    title: {
        textAlign: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: '40px',
    },
    button: {
        marginTop: '10px',
        width: '100%',
    },
    buttonGoogle: {
        background: '#DB4437',
        color: 'white'
    },
    buttonFacebook: {
        background: '#4267B2',
        color: 'white',
    },
    buttonSubmit: {
        marginTop: 16
    },
    input: {
        margin: '10px 0'
    },
    buttonCustom: {
    },
    textRegister: {
        display: 'flex',
        fontSize: '1.05rem',
        alignItems: 'center',
        marginTop: '10px'
    }

});

const Register = () => {
    const history = useHistory()

    const classes = useStyles();
    const { register, handleSubmit } = useForm<InputRegister>();

    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<InputRegister> = data => {
        if (data.password !== data.cfpassword) {
            notification['error']({
                message: "Blog Nguyễn Như Ý",
                description: "Mật khẩu xác nhận không chính xác",
            });
            return;
        }

        const { cfpassword, ...rest } = data

        dispatch(registerUser(rest));
    }

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ height: '89vh' }}
            >
                <Loading>
                    <Card className={classes.root} variant="outlined">
                        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                            <Typography className={classes.title} variant="h5" component="h2">
                                Đăng ký
                            </Typography>
                            <RegisterInput classes={classes} register={register} />
                            <Button type="submit" className={`${classes.button} ${classes.buttonSubmit}`} variant="contained" color="primary">
                                Đăng ký
                            </Button>
                            <Typography className={`${classes.textRegister}`} variant="h6" gutterBottom>
                                Đã có tài khoản?
                                <Link style={{ color: '#4267B2', margin: '0 0 4px 4px' }} to={`/login${history.location.search}`}>Đăng nhập ngay</Link>
                            </Typography>
                        </form>
                    </Card>
                </Loading>
            </Grid>
            <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, background: '#ddd', zIndex: -1 }}></div>
        </>
    )
}

export default Register
