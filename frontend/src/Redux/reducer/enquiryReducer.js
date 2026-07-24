import { 
    ADD_ENQUIRY_REQUEST, 
    ADD_ENQUIRY_SUCCESS, 
    ADD_ENQUIRY_FAILURE, 
    FETCH_ENQUIRIES_FAILURE, 
    FETCH_ENQUIRIES_REQUEST, 
    FETCH_ENQUIRIES_SUCCESS, 
    DELETE_ENQUIRY_REQUEST,
    DELETE_ENQUIRY_SUCCESS,
    DELETE_ENQUIRY_FAILURE,
    UPDATE_ENQUIRY_REQUEST,
    UPDATE_ENQUIRY_SUCCESS,
    UPDATE_ENQUIRY_FAILURE
} from "../actionType";

const initialState = {
    enquiries: [],
    loading: false,
    error: null,
    success: false,
}

export const enquiryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ENQUIRIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ENQUIRIES_SUCCESS:
            return {
                ...state,
                loading: false,
                enquiries: action.payload,
                success:false,
            };
        case FETCH_ENQUIRIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: 'Failed to fetch enquiries',
                success: false,
            };
        case ADD_ENQUIRY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_ENQUIRY_SUCCESS:
            return {
                ...state,
                loading: false,
                enquiries: [...state.enquiries, action.payload],
                success: true,
            };
        case ADD_ENQUIRY_FAILURE:
            return {
                ...state,
                loading: false,
                success:false
            };
        case UPDATE_ENQUIRY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case UPDATE_ENQUIRY_SUCCESS:
            return {
                ...state,
                loading: false,
                enquiries: state.enquiries.map(enquiry =>
                    enquiry.id === action.payload.id
                        ? { ...enquiry, ...action.payload }
                        : enquiry
                ),
                success: true,
            };
        case UPDATE_ENQUIRY_FAILURE:
            return {
                ...state,
                loading: false,
                error: 'Failed to update enquiry',
                success: false,
            };
        case DELETE_ENQUIRY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case DELETE_ENQUIRY_SUCCESS:
            return {
                ...state,
                loading: false,
                enquiries: state.enquiries.filter(enquiry => enquiry.id !== action ),
                success : true
            };
        case DELETE_ENQUIRY_FAILURE:
            return {
                ...state,
                loading: false,
                error: 'Failed to delete enquiry',
                success: false
            };
        default:
            return state;
    }
}