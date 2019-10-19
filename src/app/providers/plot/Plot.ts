import { IPlotDrawOptions, IPlotOptions } from "./dtos";
import evalExpression from "./helpers/evalExpression";
import validateRange from "./helpers/validateRange";
import { MinMaxBorders } from "../../state/ducks/calculator/dtos";

class Plot {
    static defaultStyles = {
        axisColor: '#333333',
        axisWeight: '2',
        lineColor: '#7f7fff',
        lineWeight: '1.3',
        bgColor: '#ffffff',
        rectStrokeColor: '#000000'
    };

    container: HTMLElement;
    svg: SVGElement;

    borders: MinMaxBorders = new MinMaxBorders();

    styles: any = {};

    init(options: IPlotOptions) {
        const {container} = options;
        if (!container) {
            throw new Error('Wrapper html element not found')
        }
        this.container = container;

        const styles = options.styles || {};
        this.styles = {
            ...Plot.defaultStyles,
            ...styles,
        };

        this.borders = {...options.borders};

        this.appendSvg();
        this.appendRect();
        this.initAxises();
    }

    updateBorders(borders: MinMaxBorders) {
        const {xMin, xMax, yMin, yMax} = borders;
        this.borders = {
            xMin,
            xMax,
            yMin,
            yMax
        }
    }

    appendSvg() {
        const {offsetWidth, offsetHeight} = this.container;

        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('version', '1.1');
        this.svg.setAttribute('width', offsetWidth + 'px');
        this.svg.setAttribute('height', offsetHeight + 'px');

        this.container.appendChild(this.svg);
    }

    appendRect() {
        const {offsetWidth, offsetHeight} = this.container;

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        rect.setAttribute('width', offsetWidth + 'px');
        rect.setAttribute('height', offsetHeight + 'px');
        rect.setAttribute('x', '0');
        rect.setAttribute('y', '0');
        rect.setAttribute('fill', this.styles.bgColor);
        rect.setAttribute('stroke', this.styles.rectStrokeColor);
        rect.setAttribute('stroke-width', this.styles.lineWeight);

        this.svg.appendChild(rect);
    }

    reset() {
        while (this.svg.hasChildNodes()) {
            this.svg.removeChild(this.svg.lastChild);
        }
    }

    initAxises() {
        const [xMin, xMax, yMin, yMax] = this.getRanges();

        const xAxis = this.transformY(0, yMax, yMin);
        const yAxis = this.transformX(0, xMax, xMin);

        const {offsetWidth, offsetHeight} = this.container;

        // draw X axis
        if (xAxis > 0 && xAxis < offsetHeight) {
            this.drawLine(0, xAxis, offsetWidth, xAxis, this.styles.axisColor, this.styles.axisWeight);
        }

        // draw Y axis
        if (yAxis > 0 && yAxis < offsetWidth) {
            this.drawLine(yAxis, 0, yAxis, offsetHeight, this.styles.axisColor, this.styles.axisWeight);
        }

        // draw the coordinators
        if (xAxis > 0 && xAxis < offsetHeight) {
            for (let i = 1; i <= xMax; i += 1) {
                const xPoint = this.transformX(i, xMax, xMin);
                this.drawLine(xPoint, (xAxis + 2), xPoint, (xAxis - 2), this.styles.axisColor);
            }
            for (let i = -1; i >= xMin; i -= 1) {
                const xPoint = this.transformX(i, xMax, xMin);
                this.drawLine(xPoint, (xAxis + 2), xPoint, (xAxis - 2), this.styles.axisColor);
            }
        }

        if (yAxis > 0 && yAxis < offsetWidth) {
            for (let i = 1; i <= yMax; i += 1) {
                const yPoint = this.transformY(i, yMax, yMin);
                this.drawLine((yAxis - 2), yPoint, (yAxis + 2), yPoint, this.styles.axisColor);
            }
            for (let i = -1; i >= yMin; i -= 1) {
                const yPoint = this.transformY(i, yMax, yMin);
                this.drawLine((yAxis - 2), yPoint, (yAxis + 2), yPoint, this.styles.axisColor);
            }
        }
    }

    getRanges() {
        const {xMin, xMax, yMin, yMax} = this.borders;

        const xRange = validateRange(xMax, xMin);
        const yRange = validateRange(yMax, yMin);

        return [...xRange, ...yRange];
    }

    drawLine(x1: number, y1: number, x2: number, y2: number, color, weight = this.styles.lineWeight) {
        const values = [x1, x2, y1, y2];
        const nanValues = values.some(isNaN);
        const ge = values.every(i => i >= 0);

        if (!nanValues && ge) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', '' + x1);
            line.setAttribute('y1', '' + y1);
            line.setAttribute('x2', '' + x2);
            line.setAttribute('y2', '' + y2);
            line.setAttribute('stroke', color);
            line.setAttribute('stroke-width', weight);
            this.svg.appendChild(line);
        } else {
            // else case
        }
    }

    //transforms x to match the graph
    transformX(val: number, max: number, min: number): number {
        const {offsetWidth} = this.container;
        return (val - min) * offsetWidth / (max - min);
    }

    //transforms y to match the graph
    transformY(val: number, max: number, min: number): number {
        const {offsetHeight} = this.container;
        return offsetHeight - ((val - min) * offsetHeight / (max - min));
    }

    //takes graph's x or y and returns the original x or y
    unTransformX(val, max, min) {
        const {offsetWidth} = this.container;
        return parseFloat((val) * ((max - min) / offsetWidth) + min);
    }

    draw(options: IPlotDrawOptions) {
        this.reset();

        this.appendRect();
        this.initAxises();

        const {
            expression,
            borders,
        } = options;
        this.updateBorders(borders);

        const [xMin, xMax, yMin, yMax] = this.getRanges();

        const {offsetWidth, offsetHeight} = this.container;

        let next, i = 0;
        while (i < offsetWidth) {
            let xValue = this.unTransformX(i, xMax, xMin);
            let yValue = evalExpression(expression, xValue);

            let yPoint1 = this.transformY(yValue, yMax, yMin);
            if (yPoint1 < 0) {
                yPoint1 = 0;
            }
            if (yPoint1 > offsetHeight) {
                yPoint1 = offsetHeight;
            }

            next = i + 1;

            xValue = this.unTransformX(next, xMax, xMin);
            yValue = evalExpression(expression, xValue);
            let yPoint2 = this.transformY(yValue, yMax, yMin);
            if (yPoint2 < 0) {
                yPoint2 = 0;
            }
            if (yPoint2 > offsetHeight) {
                yPoint2 = offsetHeight;
            }

            if (!((yPoint1 === 0 && yPoint2 === 0) || (yPoint1 === offsetHeight) && (yPoint2 === offsetHeight))) {
                this.drawLine(i, yPoint1, next, yPoint2, this.styles.lineColor, '' + this.styles.lineWeight);
            }

            i = next;
        }
    }
}

export default new Plot();
