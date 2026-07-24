import {
    FETCH_WEB_ADMISSIONS_REQUEST,
    FETCH_WEB_ADMISSIONS_SUCCESS,
    FETCH_WEB_ADMISSIONS_FAILURE,
    DELETE_WEB_ADMISSION_REQUEST,
    DELETE_WEB_ADMISSION_SUCCESS,
    DELETE_WEB_ADMISSION_FAILURE,
} from '../actionType';

export const fetchWebAdmissionsRequest = () => ({
    type: FETCH_WEB_ADMISSIONS_REQUEST,
});

export const fetchWebAdmissionsSuccess = (data) => ({
    type: FETCH_WEB_ADMISSIONS_SUCCESS,
    payload: data,
});

export const fetchWebAdmissionsFailure = () => ({
    type: FETCH_WEB_ADMISSIONS_FAILURE,
});

export const deleteWebAdmissionRequest = (id) => ({
    type: DELETE_WEB_ADMISSION_REQUEST,
    payload: id,
});

export const deleteWebAdmissionSuccess = (id) => ({
    type: DELETE_WEB_ADMISSION_SUCCESS,
    payload: id,
});

export const deleteWebAdmissionFailure = () => ({
    type: DELETE_WEB_ADMISSION_FAILURE,
});
