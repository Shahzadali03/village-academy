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

const initialValue = {
    fetchLoading : false,
    students : [],
    Loading: false,
    success:false,
}

const studentReducer = (state= initialValue, action) => {
    switch(action.type){
        case FETCH_STUDENTS_REQUEST:
            return{
                ...state,
                fetchLoading: true,
            }
        case FETCH_STUDENTS_SUCCESS:
            return{
                ...state,
                fetchLoading: false,
                students: action?.payload,
                success:false,
            }
        case FETCH_STUDENTS_FAILURE:
            return{
                ...state,
                fetchLoading:false,
            }
        case ADD_STUDENT_REQUEST:
            return{
                ...state,
                Loading: true,
            }
        case ADD_STUDENT_SUCCESS:
            return{
                ...state,
                Loading: false,
                success:true,
            }
        case ADD_STUDENT_FAILURE:
            return{
                ...state,
                Loading: false,
                success:false,
            }
        case DELETE_STUDENT_REQUEST:
            return{
                ...state,
                Loading: true,
            }
        case DELETE_STUDENT_SUCCESS:
            return{
                ...state,
                Loading: false,
                success:true,
            }
        case DELETE_STUDENT_FAILURE:
            return{
                ...state,
                Loading: false,
                success:false,
            }
        case UPDATE_STUDENT_REQUEST:
            return{
                ...state,
                Loading: true,
            }
        case UPDATE_STUDENT_SUCCESS:
            return{
                ...state,
                Loading: false,
                success:true,
            }
        case UPDATE_STUDENT_FAILURE:
            return{
                ...state,
                Loading: false,
                success:false,
            }
        default:
            return state;
    }
}   

export default studentReducer;
