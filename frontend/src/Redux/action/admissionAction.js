import { 
    ADD_ADMISSION_FAILURE,
    ADD_ADMISSION_REQUEST,
    ADD_ADMISSION_SUCCESS,
    DELETE_ADMISSION_FAILURE,
    DELETE_ADMISSION_REQUEST,
    DELETE_ADMISSION_SUCCESS,
    FETCH_ADMISSIONS_FAILURE, 
    FETCH_ADMISSIONS_REQUEST, 
    FETCH_ADMISSIONS_SUCCESS, 
    UPDATE_ADMISSION_FAILURE, 
    UPDATE_ADMISSION_REQUEST, 
    UPDATE_ADMISSION_SUCCESS 
} from "../actionType"

export const fetchAdmissionsRequest = ()=>{
    return{
        type: FETCH_ADMISSIONS_REQUEST,
    }
}

export const fetchAdmissionsSuccess = (data)=>{
    return{
        type: FETCH_ADMISSIONS_SUCCESS,
        payload: data
    }
}

export const fetchAdmissionsFailure = ()=>{
    return{
        type: FETCH_ADMISSIONS_FAILURE
    }
}

export const addAdmissionsRequest = (formdata)=>{
    return{
        type: ADD_ADMISSION_REQUEST,
        payload: formdata
    }
}

export const addAdmissionsSuccess = (data)=>{
    return{
        type: ADD_ADMISSION_SUCCESS,
        payload: data
    }
}

export const addAdmissionsFailure = ()=>{
    return{
        type: ADD_ADMISSION_FAILURE
    }
}

export const updateAdmissionsRequest = (id, formData)=>{
    return{
        type: UPDATE_ADMISSION_REQUEST,
        payload: { id, formData }
    }
}

export const updateAdmissionsSuccess = (data)=>{
    return{
        type: UPDATE_ADMISSION_SUCCESS,
        payload: data
    }
}

export const updateAdmissionsFailure = ()=>{
    return{
        type: UPDATE_ADMISSION_FAILURE
    }
}

export const deleteAdmissionsRequest = (id)=>{
    return{
        type: DELETE_ADMISSION_REQUEST,
        payload: id
    }
}

export const deleteAdmissionsSuccess = ()=>{
    return{
        type: DELETE_ADMISSION_SUCCESS,
    }
}

export const deleteAdmissionsFailure = ()=>{
    return{
        type: DELETE_ADMISSION_FAILURE
    }
}