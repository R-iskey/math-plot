import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import configureStore from './app/state/configureStore';

import 'antd/dist/antd.css'
import './index.css';
import ErrorBoundary from "./app/ErrorBoundary";
import registerGlobalListeners from "./global";
import App from "./app/App";
import appRoutes from "./app/appRoutes";

const routes = [
    ...appRoutes
];


const bootstrapApp = () => {
    ReactDOM.render(
        <ErrorBoundary>
            <Provider store={configureStore()}>
                <App routes={routes}/>
            </Provider>
        </ErrorBoundary>,
        document.getElementById('root')
    );
};

// Register Global Events and properties
registerGlobalListeners();
// Bootstrap the React application
bootstrapApp();

