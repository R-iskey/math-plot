import * as types from './types';

import { CalculatorDto } from "./dtos";

const calculator = (state = new CalculatorDto(), action: any = {}) => {
    switch (action.type) {
        case types.UPDATE_BORDERS:
            const { borders } = action.payload;
            return {
                ...state,
                borders: {
                    ...state.borders,
                    ...borders
                }
            };
        default:
            return state;
    }
};

export default calculator;
