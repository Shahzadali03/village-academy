import {
  ADD_FEE_FAILURE,
  ADD_FEE_REQUEST,
  ADD_FEE_SUCCESS,
  FETCH_FEES_FAILURE,
  FETCH_FEES_REQUEST,
  FETCH_FEES_SUCCESS,
  UPDATE_FEE_FAILURE,
  UPDATE_FEE_REQUEST,
  UPDATE_FEE_SUCCESS,
} from '../actionType';

export const getFeeRequest = (monthYear = null) => ({
  type: FETCH_FEES_REQUEST,
  payload: monthYear,
});

export const getFeeSuccess = (data) => ({
  type: FETCH_FEES_SUCCESS,
  payload: data,
});

export const getFeeFailure = (error) => ({
  type: FETCH_FEES_FAILURE,
  payload: error,
});

export const addFeeRequest = (id, period) => ({
  type: ADD_FEE_REQUEST,
  payload: { id, period },
});

export const addFeeSuccess = () => ({
  type: ADD_FEE_SUCCESS,
});

export const addFeeFailure = (error) => ({
  type: ADD_FEE_FAILURE,
  payload: error,
});

export const updateFeeRequest = (id, data, period) => ({
  type: UPDATE_FEE_REQUEST,
  payload: { id, data, period },
});

export const updateFeeSuccess = () => ({
  type: UPDATE_FEE_SUCCESS,
});

export const updateFeeFailure = (error) => ({
  type: UPDATE_FEE_FAILURE,
  payload: error,
});
