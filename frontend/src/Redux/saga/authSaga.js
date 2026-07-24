import { call, put, takeEvery } from "redux-saga/effects";
import { LOGIN_REQUEST } from "../actionType";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { loginFailure, loginSuccess } from "../action/authAction";

function* userLogin(action){
    try {
        const response = yield call(api.post,"/login",action.payload)
        if(response){
            localStorage.setItem("token", response.data.access_token)
            yield put(loginSuccess(response?.data))
            window.location.href = "/admin/dashboard";
        }
    } catch (error) {
        yield put(loginFailure(error?.response?.data?.detail))
        toast.error(error?.response?.data?.detail || "failed to login")
    }
}

function* authSaga(){
    yield takeEvery(LOGIN_REQUEST, userLogin)
}
export default authSaga;