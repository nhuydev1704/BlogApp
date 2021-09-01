import { Button, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FacebookIcon from '@material-ui/icons/Facebook';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import React from 'react';

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
        width: '100%'
    },
    buttonSubmit: {
        marginTop: 30
    },
    input: {
        margin: '10px 0'
    }

});

const Register = () => {
    const classes = useStyles();
    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ height: '90vh' }}
            >
                <Card className={classes.root} variant="outlined">
                    <form className={classes.form}>
                        <Typography className={classes.title} variant="h5" component="h2">
                            Đăng ký
                        </Typography>
                        <TextField className={classes.input} id="standard-search" label="Email hoặc số điện thoại" type="search" />
                        <TextField
                            id="standard-password-input"
                            label="Mật khẩu"
                            type="password"
                            autoComplete="current-password"
                        />
                        <Button className={`${classes.button} ${classes.buttonSubmit}`} variant="contained" color="primary">
                            Đăng ký
                        </Button>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    // color="secondary"
                                    className={`${classes.button}`}
                                    startIcon={<FacebookIcon />}
                                >
                                    Facebook
                                </Button>

                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    // color="secondary"
                                    className={classes.button}
                                    startIcon={<GTranslateIcon />}
                                >
                                    Google
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Grid>
            <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, background: '#ddd', zIndex: -1 }}></div>
        </>
    )
}

export default Register
