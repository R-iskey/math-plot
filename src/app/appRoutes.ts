import { lazy } from "react";
import { RouteProps } from "react-router";

const Calculator = lazy(() => import('./views/pages/Calculator/calculator.component'));

const appRoutes: RouteProps[] = [
    {
        path: "/",
        component: Calculator,
    },
];

export default appRoutes;
