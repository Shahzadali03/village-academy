import {takeEvery, call, put} from 'redux-saga/effects';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import axios from 'axios';
import { 
    ADD_STUDENT_REQUEST,
    DELETE_STUDENT_REQUEST,
    FETCH_STUDENTS_REQUEST, 
    UPDATE_STUDENT_REQUEST,
} from '../actionType';
import {
    addStudentsFailure, 
    addStudentsSuccess, 
    fetchStudentsFailure, 
    fetchStudentsSuccess,
    deleteStudentsFailure,
    deleteStudentsSuccess,
    updateStudentsFailure,
    updateStudentsSuccess
} from '../action/studentAction';


function* fetchStudents(){
    try {
        const response = yield call(api.get, '/students')
        yield put(fetchStudentsSuccess(response?.data))
    } catch (error) {
        console.log(error.response)
        toast.error(error?.response?.data?.detail)
        yield put(fetchStudentsFailure(error?.response?.data?.detail))
    }   
}

function* addStudent(action){
    try{
        const response = yield call(api.post, '/students', action.payload)
        yield put(addStudentsSuccess(response?.data))
        toast.success(response?.data?.message || "Student added successfully")
    } catch (error) {
        toast.error(error?.response?.data?.detail)
        yield put(addStudentsFailure(error))
    }
}

function* updateStudent(action){
    try{
        const response = yield call(api.put, `/students/${action.payload.id}`, action.payload.formData)
        yield put(updateStudentsSuccess(response?.data))
        toast.success(response?.data?.message || "Student updated successfully")
    } catch (error) {
        toast.error(error?.response?.data?.detail)
        yield put(updateStudentsFailure(error))
    }
}

function* deleteStudent(action){
    try{
        const response = yield call(api.delete, `/students/${action.payload}`)
        yield put(deleteStudentsSuccess())
        toast.success(response?.data?.message || "Student deleted successfully")
    } catch (error) {
        toast.error(error?.response?.data?.detail)
        yield put(deleteStudentsFailure(error))
    }
}


function* studentSaga(){
    yield takeEvery(FETCH_STUDENTS_REQUEST, fetchStudents);
    yield takeEvery(ADD_STUDENT_REQUEST, addStudent);
    yield takeEvery(UPDATE_STUDENT_REQUEST, updateStudent);
    yield takeEvery(DELETE_STUDENT_REQUEST, deleteStudent);
}

export default studentSaga;