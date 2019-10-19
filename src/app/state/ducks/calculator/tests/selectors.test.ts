import configureMockStore from "redux-mock-store";
import { calculatorSelectors } from "../index";
import { CalculatorDto } from "../dtos";

const mockStore = configureMockStore();
const store = mockStore({
    calculator: new CalculatorDto(),
});

describe('Calculator Selectors', () => {

    it('should calculatorSelector calculate correct data', () => {
        const state: any = store.getState();
        expect(calculatorSelectors.calculator(state)).toBe(state.calculator)
    });
});
