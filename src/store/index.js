import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk,
        logger
    )
);

export default store;
