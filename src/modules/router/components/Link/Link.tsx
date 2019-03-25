import * as React from 'react';
import {RouterConsumer} from '../../index';

interface ILink {
    to: string,
    className?: string,
    activeClassName?: string,
}


export const Link: React.FC<ILink> = ({children, to, className, activeClassName}) => {
    return (<RouterConsumer>
        {value => {
            return <a className={`${className} ${value.location.pathname === to ? activeClassName : ''}`} href={to}
                      onClick={(event) => {
                          event.preventDefault();
                          value.action.push(to);
                      }}>
                {children}
            </a>;
        }}
    </RouterConsumer>);
};

Link.defaultProps = {
    activeClassName: 'activeLink',
};

export default Link;
