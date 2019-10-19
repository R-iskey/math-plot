import React, { Component } from 'react';

/**
 * Catch the children components errors
 * @see https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
 * @see https://github.com/facebook/react/issues/11334#issuecomment-338656383
 */
class ErrorBoundary extends Component<any, any> {
    state = {
        hasError: false
    };

    async componentDidCatch(error, info) {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
