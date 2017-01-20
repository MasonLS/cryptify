import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger();

function configureStore(initialState = undefined) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
        thunk,
        logger
    )
  );
}

export default configureStore;
