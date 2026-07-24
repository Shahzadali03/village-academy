import { FETCH_CLASSES_FAILURE, FETCH_CLASSES_REQUEST, FETCH_CLASSES_SUCCESS } from "../actionType"

const initialState = {
    classes : [],
    loading: false,
    error : ""
}

const classReducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_CLASSES_REQUEST:
        return{
            ...state,
            loading: true,
        }
    case FETCH_CLASSES_SUCCESS:
        return{
            ...state,
            loading: false,
            classes: action.payload
        }
    case FETCH_CLASSES_FAILURE:
        return{
            ...state,
            loading:false,
            error: action.payload
        }
    default:
        return state;
  }
}

export default classReducer;
