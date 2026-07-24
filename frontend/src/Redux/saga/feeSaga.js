import { call, put, takeEvery, all } from 'redux-saga/effects';
import { ADD_FEE_REQUEST, FETCH_FEES_REQUEST, UPDATE_FEE_REQUEST } from '../actionType';
import api from '../../api/axios'
import {
    addFeeFailure,
    addFeeSuccess,
    getFeeFailure,
    getFeeSuccess,
    updateFeeFailure,
    updateFeeSuccess,
} from '../action/feeAction';
import toast from 'react-hot-toast';

function* fetchfeeList(action){
    try {
        const now = new Date();
        const month = action.payload?.month ?? now.getMonth() + 1;
        const year = action.payload?.year ?? now.getFullYear();

        const [feesResponse, collectionResponse, monthsResponse] = yield all([
            call(api.get, `/fees/monthly?month=${month}&year=${year}`),
            call(api.get, `/fees/collection?month=${month}&year=${year}`),
            call(api.get, '/fees/collection/months'),
        ]);

        if (feesResponse) {
            yield put(getFeeSuccess({
                feeList: feesResponse.data,
                totalCollection: collectionResponse?.data?.collection ?? 0,
                pendingCollection: collectionResponse?.data?.pending ?? 0,
                paidCount: collectionResponse?.data?.paid_count ?? 0,
                totalCount: collectionResponse?.data?.total_count ?? 0,
                monthOptions: monthsResponse?.data ?? [],
            }));
        }
    } catch (error) {
        yield put(getFeeFailure(error?.response?.data?.detail))
        toast.error(error?.response?.data?.detail || 'Failed to fetch fees')
    }
}

function* addStudentFee(action){
    try {
        const response = yield call(api.patch, `/fees/${action.payload}`, { isPaid: true })
        if(response){
            yield put(addFeeSuccess())
            toast.success(response?.data?.message)
        }
    } catch (error) {
       yield put(addFeeFailure(error?.response?.data?.detail))
       toast.error(error?.response?.data?.detail)
    }
}

function* updateStudentFee(action){
    try {
        const { id, data } = action.payload;
        const response = yield call(api.patch, `/fees/${id}`, data)
        if(response){
            yield put(updateFeeSuccess())
            toast.success(response?.data?.message || 'Fee amount updated')
        }
    } catch (error) {
       yield put(updateFeeFailure(error?.response?.data?.detail))
       toast.error(error?.response?.data?.detail || 'Failed to update fee amount')
    }
}


function* feeSaga(){
    yield takeEvery(FETCH_FEES_REQUEST, fetchfeeList)
    yield takeEvery(ADD_FEE_REQUEST, addStudentFee)
    yield takeEvery(UPDATE_FEE_REQUEST, updateStudentFee)
}

export default feeSaga;