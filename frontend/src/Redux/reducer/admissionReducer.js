import { 
    ADD_ADMISSION_REQUEST, 
    ADD_ADMISSION_SUCCESS, 
    ADD_ADMISSION_FAILURE, 
    FETCH_ADMISSIONS_FAILURE, 
    FETCH_ADMISSIONS_REQUEST, 
    FETCH_ADMISSIONS_SUCCESS, 
    DELETE_ADMISSION_REQUEST,
    DELETE_ADMISSION_SUCCESS,
    DELETE_ADMISSION_FAILURE,
    UPDATE_ADMISSION_REQUEST,
    UPDATE_ADMISSION_SUCCESS,
    UPDATE_ADMISSION_FAILURE
} from "../actionType";

const initialState = {
    admissions: [],
    loading: false,
    error: null,
    success: false,
}

export const admissionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ADMISSIONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ADMISSIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                admissions: action.payload,
                success:false,
            };
        case FETCH_ADMISSIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: 'Failed to fetch admissions',
                success: false,
            };
        case ADD_ADMISSION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_ADMISSION_SUCCESS:
            return {
                ...state,
                loading: false,
                admissions: [...state.admissions, action.payload],
                success: true,
            };
        case ADD_ADMISSION_FAILURE:
            return {
                ...state,
                loading: false,
                success:false
            };
        case UPDATE_ADMISSION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case UPDATE_ADMISSION_SUCCESS:
            return {
                ...state,
                loading: false,
                admissions: state.admissions.map(admission =>
                    admission.id === action.payload.id
                        ? { ...admission, ...action.payload }
                        : admission
                ),
                success: true,
            };
        case UPDATE_ADMISSION_FAILURE:
            return {
                ...state,
                loading: false,
                error: 'Failed to update admission',
                success: false,
            };
        case DELETE_ADMISSION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case DELETE_ADMISSION_SUCCESS:
            return {
                ...state,
                loading: false,
                admissions: state.admissions.filter(admission => admission.id !== action.payload),
                success: true,
            };
        case DELETE_ADMISSION_FAILURE:
            return {
                ...state,
                loading: false,
                error: 'Failed to delete admission',
                success: false
            };
        default:
            return state;
    }
}