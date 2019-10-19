import React, { Component } from "react";
import { Layout } from "antd";

import RouterOutlet from "./RouterOutlet";
import { RouteProps } from "react-router";
import { history } from "./state/configureStore";
import { ConnectedRouter } from "connected-react-router";

interface IProps {
    routes: RouteProps[];
}

interface IState {

}

class App extends Component<IProps, IState> {
    render() {
        return (
                <Layout style={{height: '100vh'}}>
                    <ConnectedRouter history={history}>
                        <RouterOutlet routes={this.props.routes}/>
                    </ConnectedRouter>
                </Layout>
        );
    }
}

export default App;
