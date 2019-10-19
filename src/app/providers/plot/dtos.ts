import { MinMaxBorders } from "../../state/ducks/calculator/dtos";

export interface IPlotOptions {
    container: HTMLElement;
    styles?: any;
    borders: MinMaxBorders;
}

export interface IPlotDrawOptions {
    strokeColor?: string;
    lineWidth?: number;
    expression: string;
    borders: MinMaxBorders;
}
