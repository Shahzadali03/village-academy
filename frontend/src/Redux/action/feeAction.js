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
    } from "../actionType"

export const getFeeRequest = (monthYear = null)=>{
    return{
        type : FETCH_FEES_REQUEST,
        payload: monthYear,
    }
}

export const getFeeSuccess = (data)=>{
    return{
        type : FETCH_FEES_SUCCESS,
        payload : data
    }
}

export const getFeeFailure = ()=>{
    return{
        type : FETCH_FEES_FAILURE
    }
}

export const addFeeRequest = (id)=>{
    return{
        type : ADD_FEE_REQUEST,
        payload : id
    }
}

export const addFeeSuccess = ()=>{
    return{
        type : ADD_FEE_SUCCESS,
    }
}

export const addFeeFailure = ()=>{
    return{
        type : ADD_FEE_FAILURE
    }
}

export const updateFeeRequest = (id, data)=>{
    return{
        type : UPDATE_FEE_REQUEST,
        payload : { id, data },
    }
}

export const updateFeeSuccess = ()=>{
    return{
        type : UPDATE_FEE_SUCCESS,
    }
}

export const updateFeeFailure = ()=>{
    return{
        type : UPDATE_FEE_FAILURE
    }
}
