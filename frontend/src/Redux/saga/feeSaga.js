import { all, call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import { feeApi } from '../../api/feeApi';
import {
  ADD_FEE_REQUEST,
  FETCH_FEES_REQUEST,
  UPDATE_FEE_REQUEST,
} from '../actionType';
import {
  addFeeFailure,
  addFeeSuccess,
  getFeeFailure,
  getFeeRequest,
  getFeeSuccess,
  updateFeeFailure,
  updateFeeSuccess,
} from '../action/feeAction';

function getPeriod(payload) {
  const now = new Date();
  return {
    month: payload?.month ?? now.getMonth() + 1,
    year: payload?.year ?? now.getFullYear(),
  };
}

function* fetchFeesSaga(action) {
  try {
    const { month, year } = getPeriod(action.payload);

    // Create monthly fee records first, then load stats in parallel.
    const feesResponse = yield call(feeApi.getMonthlyFees, month, year);
    const [collectionResponse, monthsResponse] = yield all([
      call(feeApi.getCollection, month, year),
      call(feeApi.getCollectionMonths),
    ]);

    yield put(getFeeSuccess({
      feeList: feesResponse.data ?? [],
      totalCollection: collectionResponse?.data?.collection ?? 0,
      pendingCollection: collectionResponse?.data?.pending ?? 0,
      paidCount: collectionResponse?.data?.paid_count ?? 0,
      totalCount: collectionResponse?.data?.total_count ?? 0,
      monthOptions: monthsResponse?.data ?? [],
    }));
  } catch (error) {
    const message = error?.response?.data?.detail || 'Failed to fetch fees';
    yield put(getFeeFailure(message));
    toast.error(message);
  }
}

function* markFeePaidSaga(action) {
  const { id, period } = action.payload;

  try {
    const response = yield call(feeApi.markPaid, id);
    yield put(addFeeSuccess());
    toast.success(response?.data?.message || 'Fee marked as paid');
    yield put(getFeeRequest(period));
  } catch (error) {
    const message = error?.response?.data?.detail || 'Failed to mark fee as paid';
    yield put(addFeeFailure(message));
    toast.error(message);
  }
}

function* updateFeeSaga(action) {
  const { id, data, period } = action.payload;

  try {
    const response = yield call(feeApi.updateFee, id, data);
    yield put(updateFeeSuccess());
    toast.success(response?.data?.message || 'Fee amount updated');
    yield put(getFeeRequest(period));
  } catch (error) {
    const message = error?.response?.data?.detail || 'Failed to update fee amount';
    yield put(updateFeeFailure(message));
    toast.error(message);
  }
}

function* feeSaga() {
  yield takeLatest(FETCH_FEES_REQUEST, fetchFeesSaga);
  yield takeLatest(ADD_FEE_REQUEST, markFeePaidSaga);
  yield takeLatest(UPDATE_FEE_REQUEST, updateFeeSaga);
}

export default feeSaga;
