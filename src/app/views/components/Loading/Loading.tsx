import React from "react";
import { Spin } from "antd";

interface IProps {
    size?: string;
    tip?: string;
    children?: React.Component
}
const Loading = React.memo<IProps>(function LoadingIndicator({
    size = "large",
    tip = 'Loading...',
    children
}) {

    return (
        // @ts-ignore
        <Spin size={size} tip={tip}>
            {children}
        </Spin>
    )
});


export default Loading;
