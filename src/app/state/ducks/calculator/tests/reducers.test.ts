import calculatorReducer from '../reducers';
import * as types from '../types';
import { CalculatorDto } from "../dtos";

describe('Calculator Reducers', () => {
    const initialState = new CalculatorDto();

    it ('should return the initial state', () => {
        expect(calculatorReducer(undefined, {})).toEqual(initialState);
    });

    it ('should update the borders', () => {
        expect(calculatorReducer(undefined, {
            type: types.UPDATE_BORDERS,
            payload: {
                borders: {
                    xMin: 10
                }
            }
        })).toEqual({
            borders: {
                xMin: 10,
                xMax: 100,
                yMin: -100,
                yMax: 100
            }
        })
    })
});
