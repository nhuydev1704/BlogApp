import { Button, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import LoginPass from '../components/auth/LoginPass';
import LoginSms from '../components/auth/LoginSms';
import Loading from '../components/notification/Loading';
import { login, loginSMS } from '../redux/actions/authAction';
import { useSelector } from 'react-redux'

import { RootStore } from '../utils/TypeScript'
import SocicalLogin from '../components/auth/SocicalLogin';

type Inputs = {
    account: string,
    password: string,
    type: string
};

const useStyles = makeStyles({
    root2: {
        flexGrow: 1,
    },
    root: {
        width: 420,
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

const Login = () => {
    const classes = useStyles();
    const [typeLogin, setTypeLogin] = useState(false);
    const { register, handleSubmit, reset } = useForm<Inputs>();

    const dispatch = useDispatch();

    const history = useHistory()

    const { auth } = useSelector((state: RootStore) => state)

    useEffect(() => {
        if (auth.access_token) {
            let url = history.location.search.replace('?', '/')
            return history.push(url)
        }
    }, [auth.access_token, history]);

    const onSubmit: SubmitHandler<Inputs> = data => {
        const { type, ...dataClone } = data
        if (data.type === 'sms') {
            dispatch(loginSMS(dataClone))
        } else {
            dispatch(login(dataClone))
        }
    }

    const handleChangeLogin = () => {
        reset();
        setTypeLogin(!typeLogin);
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
                                Đăng nhập
                            </Typography>
                            {typeLogin
                                ? <LoginSms classes={classes} register={register} />
                                : <LoginPass classes={classes} register={register} />
                            }
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                style={{ marginTop: '10px' }}
                            >
                                <Grid item xs={6}>
                                    <Button className={classes.buttonCustom} color="secondary">
                                        <Link
                                            style={{ color: 'rgba(0, 0, 0, 0.87)', margin: '0 0 4px 4px' }}
                                            to="/forgot_password">
                                            Quên mật khẩu?
                                        </Link>
                                    </Button>
                                </Grid>
                                <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        className={classes.buttonCustom}
                                        color="primary"
                                        onClick={handleChangeLogin}
                                    >
                                        {!typeLogin ? 'Đăng nhập SMS' : 'Đăng nhập Email'}
                                    </Button>
                                </Grid>
                            </Grid>
                            <Button type="submit" className={`${classes.button} ${classes.buttonSubmit}`} variant="contained" color="primary">
                                Đăng nhập
                            </Button>
                            <SocicalLogin classes={classes} />
                            <Typography className={`${classes.textRegister}`} variant="h6" gutterBottom>
                                Bạn chưa có tài khoản?
                                <Link style={{ color: '#4267B2', margin: '0 0 4px 4px' }} to={`/register${history.location.search}`}>Đăng kí ngay</Link>
                            </Typography>
                        </form>
                    </Card>
                </Loading>
            </Grid>
            <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, background: '#ddd', zIndex: -1 }}></div>
        </>
    )
}

export default Login
