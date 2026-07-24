import { FETCH_DASHBOARD_STAT_FAILURE, FETCH_DASHBOARD_STAT_REQUEST, FETCH_DASHBOARD_STAT_SUCCESS } from "../actionType";

const initialValue = {
    loading : false,
    stats : [],
}

const dashboardReducer = (state = initialValue, action) => {
    switch(action.type){
        case FETCH_DASHBOARD_STAT_REQUEST:
            return{
                ...state,
                loading : true
            }
        case FETCH_DASHBOARD_STAT_SUCCESS:
            return{
                ...state,
                loading: false,
                stats: action.payload
            }
        case FETCH_DASHBOARD_STAT_FAILURE:
            return{
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}

export default dashboardReducer;
