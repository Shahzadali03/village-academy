import {
    FETCH_WEB_ADMISSIONS_REQUEST,
    FETCH_WEB_ADMISSIONS_SUCCESS,
    FETCH_WEB_ADMISSIONS_FAILURE,
    DELETE_WEB_ADMISSION_REQUEST,
    DELETE_WEB_ADMISSION_SUCCESS,
    DELETE_WEB_ADMISSION_FAILURE,
} from '../actionType';

const initialState = {
    webAdmissions: [],
    loading: false,
    error: null,
    success: false,
};

export const webAdmissionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_WEB_ADMISSIONS_REQUEST:
        case DELETE_WEB_ADMISSION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_WEB_ADMISSIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                webAdmissions: action.payload,
                success: false,
            };
        case FETCH_WEB_ADMISSIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: 'Failed to fetch web admissions',
                success: false,
            };
        case DELETE_WEB_ADMISSION_SUCCESS:
            return {
                ...state,
                loading: false,
                webAdmissions: state.webAdmissions.filter((item) => item.id !== action.payload),
                success: true,
            };
        case DELETE_WEB_ADMISSION_FAILURE:
            return {
                ...state,
                loading: false,
                error: 'Failed to delete web admission',
                success: false,
            };
        default:
            return state;
    }
};
