import { takeLatest, call, put } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import api from '../../api/axios';

import { 
    ADD_ENQUIRY_REQUEST,
    DELETE_ENQUIRY_REQUEST,
    FETCH_ENQUIRIES_REQUEST,
    UPDATE_ENQUIRY_REQUEST,
} from '../actionType';
import {
    addEnquiriesFailure,
    deleteEnquiriesFailure,
    fetchEnquiriesFailure,
    updateEnquiriesFailure,
    addEnquiriesSuccess,
    deleteEnquiriesSuccess,
    fetchEnquiriesSuccess,
    updateEnquiriesSuccess
} from '../action/enquiryAction';

function* fetchEnquiriesSaga() {
    try {
        const response = yield call(api.get, '/inquiries');
        if(response){
            yield put(fetchEnquiriesSuccess(response.data));
        }
    } catch (error) {
        yield put(fetchEnquiriesFailure());
        toast.error(error?.response?.data?.detail || 'Failed to fetch enquiries');
    }
}

function* addEnquirySaga(action) {
    console.log(action.payload)
    try {
        const response = yield call(api.post, 'inquiries', action.payload);
        if(response){
            yield put(addEnquiriesSuccess(response.data));
            toast.success(response.data.message || 'Enquiry added successfully');
        }
    } catch (error) {
        yield put(addEnquiriesFailure());
        toast.error(error?.response?.data?.detail || 'Failed to add enquiry');
    }
}

function* updateEnquirySaga(action) {
    try {
        const response = yield call(api.put, `/inquiries/${action.payload.id}`, action.payload.formData);
        if(response){
            yield put(updateEnquiriesSuccess(response.data));
            toast.success(response.data.message || 'Enquiry updated successfully');
        }
    } catch (error) {
        yield put(updateEnquiriesFailure());
        toast.error(error?.response?.data?.detail || 'Failed to update enquiry');
    }
}

function* deleteEnquirySaga(action) {
    try {
        const response = yield call(api.delete, `/inquiries/${action.payload}`);
        if(response){
            yield put(deleteEnquiriesSuccess(action.payload));
        }
    } catch (error) {
        yield put(deleteEnquiriesFailure());
        toast.error(error?.response?.data?.detail || 'Failed to delete enquiry');
    }
}

function* enquirySaga() {
    yield takeLatest(FETCH_ENQUIRIES_REQUEST, fetchEnquiriesSaga);
    yield takeLatest(ADD_ENQUIRY_REQUEST, addEnquirySaga);
    yield takeLatest(UPDATE_ENQUIRY_REQUEST, updateEnquirySaga);
    yield takeLatest(DELETE_ENQUIRY_REQUEST, deleteEnquirySaga);
}

export default enquirySaga;