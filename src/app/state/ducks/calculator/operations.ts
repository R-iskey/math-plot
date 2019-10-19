import { message } from "antd";
import getExpressionVariable from "../../../utils/getExpressionVariable";
import plotInstance from "../../../providers/plot/Plot";
import { updateBorders } from "./actions";
import { IPlotOptions } from "../../../providers/plot/dtos";

const initPlot = (plotOption: IPlotOptions) => {
    plotInstance.init(plotOption);
};

const drawPlot = (value: string) => {
    return (dispatch, getState) => {
        const matches = getExpressionVariable(value);
        const isSameLetter = matches.every(letter => letter === matches[0]);
        if (!isSameLetter) {
            return message.error(`Current version, doesn't support operations with 2 or more variables`);
        }
        const {borders} = getState().calculator;
        try {
            plotInstance.draw({
                expression: value,
                borders
            });
        } catch (e) {
            return message.error(`Oops! Please provide the correct math expression`);
        }
    }

};


export default {
    initPlot,
    drawPlot,
    updateBorders
};
