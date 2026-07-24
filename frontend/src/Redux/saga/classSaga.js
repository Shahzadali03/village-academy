import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_CLASSES_REQUEST } from "../actionType";
import { fetchClassFailure, fetchClassSuccess } from "../action/classAction";
import api from "../../api/axios";
import toast from "react-hot-toast";

function* fetchClasses(){
    try {
        const response = yield call(api.get, 'classes');
        if(response){
            yield put(fetchClassSuccess(response?.data));
        } 
    } catch (error) {
        toast.error(error?.response?.data?.detail || "Failed to Fetch Classes")
        yield put(fetchClassFailure(error?.response?.data?.detail) || "Failed to Fetch Classes")
    }
}

function* classSaga(){
    yield takeEvery(FETCH_CLASSES_REQUEST, fetchClasses)
}

export default classSaga;