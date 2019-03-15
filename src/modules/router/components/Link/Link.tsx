import * as React from 'react';
import {RouterConsumer} from '../../index';

interface ILink {
    to: string,
    className?: string,
}


export const Link: React.FC<ILink> = ({children, to, className}) => {
    return (<RouterConsumer>
        {value => {
            return <a className={className} href={to} onClick={(event) => {
                event.preventDefault();
                value.action.push(to);
            }}>
                {children}
            </a>;
        }}
    </RouterConsumer>);
};

export default Link;
