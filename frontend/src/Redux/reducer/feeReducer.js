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

const initialState = {
  loading: false,
  savingFeeId: null,
  feeList: [],
  totalCollection: 0,
  pendingCollection: 0,
  paidCount: 0,
  totalCount: 0,
  monthOptions: [],
  error: null,
};

const feeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_FEES_SUCCESS:
      return {
        ...state,
        loading: false,
        savingFeeId: null,
        feeList: action.payload?.feeList ?? [],
        totalCollection: action.payload?.totalCollection ?? 0,
        pendingCollection: action.payload?.pendingCollection ?? 0,
        paidCount: action.payload?.paidCount ?? 0,
        totalCount: action.payload?.totalCount ?? 0,
        monthOptions: action.payload?.monthOptions ?? [],
        error: null,
      };

    case FETCH_FEES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_FEE_REQUEST:
    case UPDATE_FEE_REQUEST:
      return {
        ...state,
        savingFeeId: action.payload?.id ?? null,
        error: null,
      };

    case ADD_FEE_SUCCESS:
    case UPDATE_FEE_SUCCESS:
      return {
        ...state,
        savingFeeId: null,
        error: null,
      };

    case ADD_FEE_FAILURE:
    case UPDATE_FEE_FAILURE:
      return {
        ...state,
        savingFeeId: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default feeReducer;
