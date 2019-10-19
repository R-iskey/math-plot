import React, { Component, RefObject } from "react";
import { Button, Col, Form, Icon, Input, InputNumber, Layout, Row } from "antd";
import { calculatorOperations, calculatorSelectors } from "../../../state/ducks";
import { connect } from "react-redux";
import { MinMaxBorders } from "../../../state/ducks/calculator/dtos";

interface IProps {
    borders: MinMaxBorders,
    updateBorders: (borders: Partial<MinMaxBorders>) => {};
    drawPlot: (value: string) => {};
}

interface IState {
    expression: string
}

const stateToProps = state => ({
    borders: calculatorSelectors.calcBordersSelector(state)
});

const dispatchToProps = dispatch => ({
    updateBorders: (borders: MinMaxBorders) => dispatch(calculatorOperations.updateBorders(borders)),
    drawPlot: (value: string) => dispatch(calculatorOperations.drawPlot(value)),
});

class CalculatorComponent extends Component<IProps, IState> {
    state = {
        expression: '',
    };

    plotRef: RefObject<HTMLDivElement> = React.createRef();

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleExpressionChange = this.handleExpressionChange.bind(this);
        this.handleRange = this.handleRange.bind(this);
    }

    componentDidMount(): void {
        calculatorOperations.initPlot({
            container: this.plotRef.current,
            borders: this.props.borders
        });
    }

    handleExpressionChange(e) {
        const {value} = e.target;
        this.setState({
            expression: value,
        });
    }

    handleRange(value: number, field: string) {
        this.props.updateBorders({
            [field]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const {expression} = this.state;
        if (expression) {
            this.props.drawPlot(expression);
        }
    }

    isSubmitActive = () => {
        const {expression} = this.state;
        const {xMin, xMax, yMax, yMin} = this.props.borders;

        return expression && yMin && yMax && xMax && xMin;
    };

    render() {
        const {Content} = Layout;
        const {xMin, xMax, yMax, yMin} = this.props.borders;
        return (
            <Layout>
                <Content style={{padding: "60px 50px" }}>
                    <Form onSubmit={this.handleSubmit}>
                        <Row type="flex" justify="space-between">
                            <Col span={10}>
                                <Form.Item label='Math. expression with one variable: X'>
                                    <Input
                                        prefix={<Icon type="calculator" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="Math Expression"
                                        size="large"
                                        onChange={this.handleExpressionChange}
                                    />
                                </Form.Item>
                                <Form.Item label={`Range for X`}>
                                    <Row type="flex">
                                        <Col span={6}>
                                            <InputNumber
                                                placeholder="From"
                                                onChange={(number) => this.handleRange(number, 'xMin')}
                                                value={xMin}
                                            />
                                        </Col>
                                        <Col span={6}>
                                            <InputNumber
                                                placeholder="To"
                                                onChange={(number) => this.handleRange(number, 'xMax')}
                                                value={xMax}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Item>
                                <Form.Item label={`Range for Y`}>
                                    <Row type="flex">
                                        <Col span={6}>
                                            <InputNumber
                                                placeholder="From"
                                                onChange={(number) => this.handleRange(number, 'yMin')}
                                                value={yMin}
                                            />
                                        </Col>
                                        <Col span={6}>
                                            <InputNumber
                                                placeholder="To"
                                                value={yMax}
                                                onChange={(number) => this.handleRange(number, 'yMax')}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        disabled={!this.isSubmitActive()}
                                        size="large"
                                        htmlType="submit"
                                        type="primary"
                                    >
                                        Calculate
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <div ref={this.plotRef} style={{
                                    width: "100%",
                                    height: "300px"
                                }}> </div>
                            </Col>
                        </Row>
                    </Form>
                </Content>
            </Layout>
        )
    }
}

export default connect(stateToProps, dispatchToProps)(CalculatorComponent)
