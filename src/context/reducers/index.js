import { combineReducers } from 'redux';
// Importing combineReducers from Redux (used to combine multiple reducers).

import userAuthReducer from './userAuthReducer';
import projectReducers from './projectReducers'
// Importing the user authentication reducer (handles user login/logout state).

const myReducer = combineReducers({
    user: userAuthReducer,
    projects: projectReducers,
    // Combining reducers (right now, we only have userAuthReducer).
    // This means the state will have a "user" field controlled by userAuthReducer.
});

export default myReducer;
// Exporting the combined reducer so it can be used in the Redux store.
