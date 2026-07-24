import {takeEvery, call, put} from "redux-saga/effects";
import { FETCH_DASHBOARD_STAT_REQUEST } from "../actionType";
import { fetchstatsSuccess } from "../action/dasboardAction";
import toast from "react-hot-toast";
import api from "../../api/axios";


function* fetchDashboardStats(){
    try {
        const response = yield call(api.get, 'dashboard-stats');
        if(response){
           yield put(fetchstatsSuccess(response.data))
        }
    } catch (error) {
        toast.error(error?.response?.data?.detail || "Failed to fetch Dashboard stats")
    }
}

function* dashboardSaga(){
    yield takeEvery(FETCH_DASHBOARD_STAT_REQUEST, fetchDashboardStats)
}

export default dashboardSaga;