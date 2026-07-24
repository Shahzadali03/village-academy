import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import dashboardSaga from './dashboardSaga';
import studentSaga from './studentSaga';
import enquirySaga from './enquirySaga';
import admissionSaga from './admissionSaga';
import classSaga from './classSaga';
import feeSaga from './feeSaga';
import webAdmissionSaga from './webAdmissionSaga';

function* rootSaga() {
    yield all([
        authSaga(),
        dashboardSaga(),
        studentSaga(),
        enquirySaga(),
        admissionSaga(),
        classSaga(),
        feeSaga(),
        webAdmissionSaga(),
    ]);
}

export default rootSaga;