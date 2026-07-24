import { combineReducers } from 'redux';
import dashboardReducer from './dashboardReducer';
import authReducer from './authReducer';
import studentReducer from './studentReducer';
import {enquiryReducer} from './enquiryReducer';
import {admissionReducer} from './admissionReducer';
import classReducer from './classReducer';
import feeReducer from './feeReducer';
import { webAdmissionReducer } from './webAdmissionReducer';

const rootReducer = combineReducers({
    auth: authReducer, 
    dashboard: dashboardReducer,
    classes: classReducer,
    students: studentReducer,
    enquiries: enquiryReducer,
    admissions: admissionReducer,
    fees : feeReducer,
    webAdmissions: webAdmissionReducer,
})

export default rootReducer;