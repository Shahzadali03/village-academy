import { ADD_FEE_FAILURE, ADD_FEE_REQUEST, ADD_FEE_SUCCESS, FETCH_FEES_FAILURE, FETCH_FEES_REQUEST, FETCH_FEES_SUCCESS, UPDATE_FEE_FAILURE, UPDATE_FEE_REQUEST, UPDATE_FEE_SUCCESS } from "../actionType"

const initialState = {
    loading : false,
    feeList : [],
    totalCollection: 0,
    pendingCollection: 0,
    paidCount: 0,
    totalCount: 0,
    monthOptions: [],
    error : null,
    success: false,
}

const feeReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_FEES_REQUEST:
            return {
                ...state,
                loading : true,
            }
        case FETCH_FEES_SUCCESS:
            return{
                ...state,
                loading: false,
                feeList : Array.isArray(action.payload)
                    ? action.payload
                    : action.payload.feeList,
                totalCollection: Array.isArray(action.payload)
                    ? state.totalCollection
                    : (action.payload.totalCollection ?? 0),
                pendingCollection: Array.isArray(action.payload)
                    ? state.pendingCollection
                    : (action.payload.pendingCollection ?? 0),
                paidCount: Array.isArray(action.payload)
                    ? state.paidCount
                    : (action.payload.paidCount ?? 0),
                totalCount: Array.isArray(action.payload)
                    ? state.totalCount
                    : (action.payload.totalCount ?? 0),
                monthOptions: Array.isArray(action.payload)
                    ? state.monthOptions
                    : (action.payload.monthOptions ?? state.monthOptions),
                error: null
            }
        case FETCH_FEES_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case ADD_FEE_REQUEST:
            return{
                ...state,
                loading: true,
                success:false,
            }
        case ADD_FEE_SUCCESS:
            return{
                ...state,
                loading: false,
                error: null,
                success:true
            }
        case ADD_FEE_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload,
                success:false
            }
        case UPDATE_FEE_REQUEST:
            return{
                ...state,
                loading: true,
                success: false,
            }
        case UPDATE_FEE_SUCCESS:
            return{
                ...state,
                loading: false,
                error: null,
                success: true,
            }
        case UPDATE_FEE_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            }
        default:
            return state;
    }
}

export default feeReducer
