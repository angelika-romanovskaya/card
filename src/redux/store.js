import {legacy_createStore as createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunk from 'redux-thunk'

import rootReducers from './module'

const configureStore = (reducers = {}, preloadedState={}, middlewars = [])=> createStore(
    combineReducers({
        ...rootReducers,
        ...reducers
    }),
    preloadedState,
    compose(
        applyMiddleware(
            ...middlewars,
            thunk
        ),
    )
);

export default configureStore;
