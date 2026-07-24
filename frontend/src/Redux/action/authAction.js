import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../actionType"

export const loginRequest = (data)=>{
    return{
        type : LOGIN_REQUEST,
        payload : data
    }
}

export const loginSuccess = (data)=>{
    return{
        type : LOGIN_SUCCESS,
        payload : data
    }
}

export const loginFailure = () => {
    return{
        type : LOGIN_FAILURE,
    }
}