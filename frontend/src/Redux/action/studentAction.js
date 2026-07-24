import { 
    ADD_STUDENT_FAILURE,
    ADD_STUDENT_REQUEST,
    ADD_STUDENT_SUCCESS,
    DELETE_STUDENT_FAILURE,
    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_SUCCESS,
    FETCH_STUDENTS_FAILURE, 
    FETCH_STUDENTS_REQUEST, 
    FETCH_STUDENTS_SUCCESS, 
    UPDATE_STUDENT_FAILURE, 
    UPDATE_STUDENT_REQUEST, 
    UPDATE_STUDENT_SUCCESS 
} from "../actionType"

export const fetchStudentsRequest = ()=>{
    return{
        type: FETCH_STUDENTS_REQUEST,
    }
}

export const fetchStudentsSuccess = (data)=>{
    return{
        type: FETCH_STUDENTS_SUCCESS,
        payload: data
    }
}

export const fetchStudentsFailure = ()=>{
    return{
        type: FETCH_STUDENTS_FAILURE
    }
}

export const addStudentsRequest = (formdata)=>{
    return{
        type: ADD_STUDENT_REQUEST,
        payload: formdata
    }
}

export const addStudentsSuccess = (data)=>{
    return{
        type: ADD_STUDENT_SUCCESS,
        payload: data
    }
}

export const addStudentsFailure = ()=>{
    return{
        type: ADD_STUDENT_FAILURE
    }
}

export const updateStudentsRequest = (id, formData)=>{
    return{
        type: UPDATE_STUDENT_REQUEST,
        payload: { id, formData }
    }
}

export const updateStudentsSuccess = (data)=>{
    return{
        type: UPDATE_STUDENT_SUCCESS,
        payload: data
    }
}

export const updateStudentsFailure = ()=>{
    return{
        type: UPDATE_STUDENT_FAILURE
    }
}

export const deleteStudentsRequest = (id)=>{
    return{
        type: DELETE_STUDENT_REQUEST,
        payload: id
    }
}

export const deleteStudentsSuccess = ()=>{
    return{
        type: DELETE_STUDENT_SUCCESS,
    }
}

export const deleteStudentsFailure = ()=>{
    return{
        type: DELETE_STUDENT_FAILURE
    }
}