import React from 'react';
import { FacebookLogin, FacebookLoginAuthResponse } from 'react-facebook-login-lite';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite';
import { useDispatch } from 'react-redux';
import { gooogleLogin, facebookLogin } from '../../redux/actions/authAction';


const SocicalLogin = (props: any) => {

    const dispatch = useDispatch()

    const onSuccess = (googleUser: GoogleLoginResponse) => {
        const id_token = googleUser.getAuthResponse().id_token;
        dispatch(gooogleLogin(id_token))
    }

    const onSuccessFacebook = (response: FacebookLoginAuthResponse) => {
        const { accessToken, userID } = response.authResponse
        dispatch(facebookLogin(accessToken, userID))
    }

    return (
        <div>
            <GoogleLogin
                height={33}
                client_id='20438262926-mu9r8d41jhrka3ug7i8e1ldnbke2q4r3.apps.googleusercontent.com'
                cookiepolicy='single_host_origin'
                onSuccess={onSuccess}
            />
            <FacebookLogin
                height={'33px'}
                theme="dark"
                appId="370848948079066"
                onSuccess={onSuccessFacebook}
            />
        </div>
    )
}

export default SocicalLogin
