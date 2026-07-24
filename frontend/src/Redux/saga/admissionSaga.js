import { takeLatest, call, put } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import api from '../../api/axios';

import { 
    ADD_ADMISSION_REQUEST,
    DELETE_ADMISSION_REQUEST,
    FETCH_ADMISSIONS_REQUEST,
    UPDATE_ADMISSION_REQUEST,
} from '../actionType';
import {
    addAdmissionsFailure,
    deleteAdmissionsFailure,
    fetchAdmissionsFailure,
    updateAdmissionsFailure,
    addAdmissionsSuccess,
    deleteAdmissionsSuccess,
    fetchAdmissionsSuccess,
    updateAdmissionsSuccess
} from '../action/admissionAction';

function* fetchAdmissionsSaga() {
    try {
        const response = yield call(api.get, 'admissions');
        if(response){
            yield put(fetchAdmissionsSuccess(response.data));
        }
    } catch (error) {
        yield put(fetchAdmissionsFailure());
        toast.error(error?.response?.data?.detail || 'Failed to fetch admissions');
    }
}

function* addAdmissionSaga(action) {
    try {
        const response = yield call(api.post, 'admissions', action.payload);
        if(response){
            yield put(addAdmissionsSuccess(response.data));
            toast.success(response.data.message || 'Admission added successfully');
        }
    } catch (error) {
        yield put(addAdmissionsFailure());
        toast.error(error?.response?.data?.detail || 'Failed to add admission');
    }
}

function* updateAdmissionSaga(action) {
    try {
        const response = yield call(api.put, `/admissions/${action.payload.id}`, action.payload.formData);
        console.log(response);
        if(response){
            yield put(updateAdmissionsSuccess(response.data));
            toast.success(response.data.message || 'Admission updated successfully');
        }
    } catch (error) {
        yield put(updateAdmissionsFailure());
        toast.error(error?.response?.data?.detail || 'Failed to update admission');
    }
}

function* deleteAdmissionSaga(action) {
    try {
        const response = yield call(api.delete, `admissions/${action.payload}`);
        if(response){
            yield put(deleteAdmissionsSuccess(action.payload));
        }
    } catch (error) {
        yield put(deleteAdmissionsFailure());
        toast.error(error?.response?.data?.detail || 'Failed to delete admission');
    }
}

function* admissionSaga() {
    yield takeLatest(FETCH_ADMISSIONS_REQUEST, fetchAdmissionsSaga);
    yield takeLatest(ADD_ADMISSION_REQUEST, addAdmissionSaga);
    yield takeLatest(UPDATE_ADMISSION_REQUEST, updateAdmissionSaga);
    yield takeLatest(DELETE_ADMISSION_REQUEST, deleteAdmissionSaga);
}

export default admissionSaga;