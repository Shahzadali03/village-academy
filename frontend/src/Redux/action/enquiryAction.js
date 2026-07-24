import { 
    FETCH_ENQUIRIES_REQUEST, 
    FETCH_ENQUIRIES_SUCCESS,
    FETCH_ENQUIRIES_FAILURE,
    ADD_ENQUIRY_REQUEST,
    ADD_ENQUIRY_SUCCESS,
    ADD_ENQUIRY_FAILURE,
    UPDATE_ENQUIRY_REQUEST,
    UPDATE_ENQUIRY_SUCCESS,
    UPDATE_ENQUIRY_FAILURE,
    DELETE_ENQUIRY_REQUEST,
    DELETE_ENQUIRY_SUCCESS,
    DELETE_ENQUIRY_FAILURE
} from "../actionType"

export const fetchEnquiriesRequest = ()=>{
    return{
        type: FETCH_ENQUIRIES_REQUEST,
    }
}

export const fetchEnquiriesSuccess = (data)=>{
    return{
        type: FETCH_ENQUIRIES_SUCCESS,
        payload: data
    }
}

export const fetchEnquiriesFailure = ()=>{
    return{
        type: FETCH_ENQUIRIES_FAILURE
    }
}

export const addEnquiriesRequest = (formdata)=>{
    return{
        type: ADD_ENQUIRY_REQUEST,
        payload: formdata
    }
}   

export const addEnquiriesSuccess = (data)=>{
    return{
        type: ADD_ENQUIRY_SUCCESS,
        payload: data
    }
}

export const addEnquiriesFailure = ()=>{
    return{
        type: ADD_ENQUIRY_FAILURE
    }
}

export const updateEnquiriesRequest = (id, formData)=>{
    return{
        type: UPDATE_ENQUIRY_REQUEST,
        payload: { id, formData }
    }
}

export const updateEnquiriesSuccess = (data)=>{
    return{
        type: UPDATE_ENQUIRY_SUCCESS,
        payload: data
    }
}

export const updateEnquiriesFailure = ()=>{
    return{
        type: UPDATE_ENQUIRY_FAILURE
    }
}

export const deleteEnquiriesRequest = (id)=>{
    return{
        type: DELETE_ENQUIRY_REQUEST,
        payload: id
    }
}

export const deleteEnquiriesSuccess = ()=>{
    return{
        type: DELETE_ENQUIRY_SUCCESS,
    }
}

export const deleteEnquiriesFailure = ()=>{
    return{
        type: DELETE_ENQUIRY_FAILURE
    }  
}