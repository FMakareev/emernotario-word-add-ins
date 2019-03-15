import * as React from 'react';
import {IRoute, RouterConsumer} from '../../index';

interface ICreateRoute {
    routes?: IRoute[],
}


export const CreateRoute: React.FC<ICreateRoute> = () => {
    return (<RouterConsumer>
        {({history}) => {
            if (history.length) {
                const Component = history[history.length - 1].component;
                return <Component/>;
            } else {
                return null;
            }
        }}
    </RouterConsumer>);
};

export default CreateRoute;
