import { 
    FETCH_DASHBOARD_STAT_FAILURE, 
    FETCH_DASHBOARD_STAT_REQUEST, 
    FETCH_DASHBOARD_STAT_SUCCESS 
} from "../actionType"

export const fetchstatsRequest = ()=>{
    return{
        type: FETCH_DASHBOARD_STAT_REQUEST,
    }
}

export const fetchstatsSuccess = (data)=>{
    return{
        type: FETCH_DASHBOARD_STAT_SUCCESS,
        payload: data
    }
}

export const fetchstatsFailure = ()=>{
    return{
        type: FETCH_DASHBOARD_STAT_FAILURE
    }
}
