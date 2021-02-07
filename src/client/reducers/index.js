import {alert} from './alert.reducer';
import { authentication} from './authentication.reducer';
import { users } from './users.reducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    alert,authentication,users
})

export default allReducers;