import { Button, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { notification } from 'antd';
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ResetPassword from "../../components/auth/ResetPassword";
import Loading from "../../components/notification/Loading";
import { resetPassword } from '../../redux/actions/profileAction';
import { IParams } from "../../utils/TypeScript";


type Inputs = {
	password: string
	cfpassword: string
};

const useStyles = makeStyles({
	root2: {
		flexGrow: 1,
	},
	root: {
		width: 420,
		borderRadius: "10px",
	},
	title: {
		textAlign: "center",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		padding: "40px",
	},
	button: {
		marginTop: "10px",
		width: "100%",
	},
	buttonSubmit: {
		marginTop: 16,
	}
});

const ResetPasswords = () => {
	const token = useParams<IParams>().slug;
	const classes = useStyles();
	const { register, handleSubmit, reset } = useForm<Inputs>();

	const dispatch = useDispatch();
	const history = useHistory()

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		if (data.password !== data.cfpassword) {
			notification["error"]({
				message: "Blog Nguyễn Như Ý",
				description: "Mật khẩu xác nhận không chính xác",
			});
			return;
		}

		if (data.password.length < 6) {
			notification['error']({
				message: "Blog Nguyễn Như Ý",
				description: "Mật khẩu tổi thiểu 6 kí tự",
			});
			return;
		}

		const { cfpassword, ...rest } = data;
		dispatch(resetPassword(rest.password, token))
		history.push('/login')
	};

	return (
		<>
			<Grid
				container
				direction="row"
				justifyContent="center"
				alignItems="center"
				style={{ height: "89vh" }}
			>
				<Loading>
					<Card className={classes.root} variant="outlined">
						<form
							className={classes.form}
							onSubmit={handleSubmit(onSubmit)}
						>
							<Typography
								className={classes.title}
								variant="h5"
								component="h2"
							>
								Quên mật khẩu
							</Typography>
							<ResetPassword
								classes={classes}
								register={register}
							/>
							<Button
								type="submit"
								className={`${classes.button} ${classes.buttonSubmit}`}
								variant="contained"
								color="primary"
							>
								Gửi
							</Button>
						</form>
					</Card>
				</Loading>
			</Grid>
			<div
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					background: "#ddd",
					zIndex: -1,
				}}
			></div>
		</>
	);
};

export default ResetPasswords;
