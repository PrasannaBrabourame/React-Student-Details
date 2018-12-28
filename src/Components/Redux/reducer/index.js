import { combineReducers } from 'redux';
import studentdetails from './studentReducer';

export default combineReducers({
    studentdetails: studentdetails
});