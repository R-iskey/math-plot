import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "./middlewares";
import { createBrowserHistory } from 'history';
import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

export let store: Store<any, any>;

export default function configureStore(initialState = {}) {
    store = createStore(
        rootReducer(history),
        initialState,
        composeWithDevTools(
            applyMiddleware(
                // connecting router to redux store
                routerMiddleware(history),
                // thunks middleware
                thunk,
                // console logger
                createLogger(true),
            ),
        )
    );
    return store;
}
