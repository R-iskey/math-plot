export class MinMaxBorders {
    xMax: number = 100;
    xMin: number = -100;
    yMin: number = -100;
    yMax: number = 100;
}

export class CalculatorDto {
    borders: MinMaxBorders = new MinMaxBorders()
}
