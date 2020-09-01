import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: localId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error,
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000); // 토큰 만료기간 되면, 자동으로 로그아웃됨.
    }
}

export const errorInit = () => {
    return {
        type: actionTypes.ERROR_INIT
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQ3DtnwE8fgDvy-TeHf1uZIWjAwCoqMMM";
        if(!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQ3DtnwE8fgDvy-TeHf1uZIWjAwCoqMMM'
        }
        axios.post(url, authData)
            .then(res => {
                const expirationTime = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationTime);
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })       
            .catch(err => {
                dispatch(authFail(err.response.data.error.message));
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        } else { //새로고침했을 때 여기 실행. 로컬 스토리지에 토큰이 있는 상태.
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(new Date() < expirationDate) { //만료시간이 아직 남아있을 때만
                const userId = localStorage.getItem('userId');
                const expirationTime = expirationDate.getTime(); // 밀리초 단위.
                const currentTime = new Date().getTime();
                const leftTime = expirationTime - currentTime; //여전히 밀리초
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(leftTime / 1000)); //초 단위로 바꾸기.
            }else {
                dispatch(logout()); //이거 안해줘도 checkAuthTimeout() 액션으로 자동 로그아웃 되긴함.
            }
        }   

    }
}