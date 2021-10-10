import { Button, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import FormForgotPassword from '../components/auth/FormForgotPassword';
import Loading from '../components/notification/Loading';
import { forgotPassword } from '../redux/actions/authAction';

type Inputs = {
    account: string
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
    buttonSubmit: {
        marginTop: 16
    }

});

const ForgotPassword = () => {
    const classes = useStyles();
    const { register, handleSubmit, reset } = useForm<Inputs>();
    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<Inputs> = data => {
        dispatch(forgotPassword(data.account))
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
                                Quên mật khẩu
                            </Typography>
                            <FormForgotPassword classes={classes} register={register} />
                            <Button type="submit" className={`${classes.button} ${classes.buttonSubmit}`} variant="contained" color="primary">
                                Gửi
                            </Button>
                        </form>
                    </Card>
                </Loading>
            </Grid>
            <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, background: '#ddd', zIndex: -1 }}></div>
        </>
    )
}

export default ForgotPassword
