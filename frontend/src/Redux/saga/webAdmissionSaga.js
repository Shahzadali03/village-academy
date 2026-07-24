import { takeLatest, call, put } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import {
    FETCH_WEB_ADMISSIONS_REQUEST,
    DELETE_WEB_ADMISSION_REQUEST,
} from '../actionType';
import {
    fetchWebAdmissionsFailure,
    fetchWebAdmissionsSuccess,
    deleteWebAdmissionFailure,
    deleteWebAdmissionSuccess,
} from '../action/webAdmissionAction';

function* fetchWebAdmissionsSaga() {
    try {
        const response = yield call(api.get, '/web-admissions');
        if (response) {
            yield put(fetchWebAdmissionsSuccess(response.data));
        }
    } catch (error) {
        yield put(fetchWebAdmissionsFailure());
        toast.error(error?.response?.data?.detail || 'Failed to fetch web admissions');
    }
}

function* deleteWebAdmissionSaga(action) {
    try {
        const response = yield call(api.delete, `/web-admissions/${action.payload}`);
        if (response) {
            yield put(deleteWebAdmissionSuccess(action.payload));
            toast.success(response.data.message || 'Web admission deleted successfully');
        }
    } catch (error) {
        yield put(deleteWebAdmissionFailure());
        toast.error(error?.response?.data?.detail || 'Failed to delete web admission');
    }
}

function* webAdmissionSaga() {
    yield takeLatest(FETCH_WEB_ADMISSIONS_REQUEST, fetchWebAdmissionsSaga);
    yield takeLatest(DELETE_WEB_ADMISSION_REQUEST, deleteWebAdmissionSaga);
}

export default webAdmissionSaga;
