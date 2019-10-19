import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import calculator from './ducks/calculator';

export default (history) => combineReducers({
    calculator,
    router: connectRouter(history)
});
