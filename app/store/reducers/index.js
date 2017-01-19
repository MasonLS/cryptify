import { combineReducers } from 'redux';
import password from './password';
import tracks from './tracks';

const rootReducer = combineReducers({
    password,
    tracks
});

export default rootReducer;
