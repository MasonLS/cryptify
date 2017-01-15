import { combineReducers } from 'redux';
import password from './password';
import top from './top';
import search from './search';

const rootReducer = combineReducers({
    password,
    search,
    top
});

export default rootReducer;
