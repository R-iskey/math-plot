import { createSelector } from "reselect";

const calculator = state => state.calculator;
const calcBordersSelector = createSelector([calculator], calc => calc.borders);

export default {
    calculator,
    calcBordersSelector
}
