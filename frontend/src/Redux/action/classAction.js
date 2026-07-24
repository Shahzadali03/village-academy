import { FETCH_CLASSES_FAILURE, FETCH_CLASSES_REQUEST, FETCH_CLASSES_SUCCESS } from "../actionType"

export const fetchClassRequest = ()=>{
    return{
        type : FETCH_CLASSES_REQUEST,
    }
}

export const fetchClassSuccess = (data)=>{
    return{
        type : FETCH_CLASSES_SUCCESS,
        payload : data
    }
}

export const fetchClassFailure = (error)=>{
    return{
        type : FETCH_CLASSES_FAILURE,
        payload : error
    }
}