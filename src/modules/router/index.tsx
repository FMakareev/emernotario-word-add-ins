import * as React from 'react';


export interface IRouterAction {
    goBack: any,
    goNext: any,
    push: any,
    replace: any,
    subscribe: any,
    unSubscribe: any,
}

export interface IContextProps extends IRouterProviderState {
    action: IRouterAction,
    routes: IRoute[],
}


export interface IRoute {
    component: any,
    path: string,
    name: string,
    exact: boolean
}

export interface ILocation {
    host?: string,
    hostname?: string,
    origin?: string,
    href?: string,
    pathname?: string
    search?: string
}

export interface IRouterProviderState {
    routes?: IRoute[],
    history?: IRoute[],
    activeRoute?: any,
    location?: ILocation
}

export interface RouterProviderProps extends IRouterProviderState {
    [PropName: string]: any

    initPathname?: string,
}


export const {Provider, Consumer: RouterConsumer} = React.createContext<Partial<IContextProps>>({});


export class RouterProvider extends React.Component<RouterProviderProps, IRouterProviderState> {

    static defaultProps = {
        routes: [],
        history: [],

    };


    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {
            routes: this.props.routes,
            history: this.initHistory(),
            location: {
                host: '',
                hostname: '',
                origin: '',
                href: '',
                pathname: '/',
                search: '',
            }
        };
    }

    initHistory = (): IRoute[] => {
        const {history, initPathname, routes} = this.props;
        if (initPathname && routes.length) {
            let route: IRoute = this.findRouteByPathname(initPathname);
            if (route) {
                return [route];
            } else {
                console.warn(`initPathname = ${initPathname} not found`);
            }
        }

        if (!history.length) {
            let route: IRoute = this.findRouteByPathname('/');
            if (route) {
                return [route];
            } else {
                console.warn(`pathname "/" not found`);
            }
        }
        return [];
    };

    /** @desc */
    findRouteByPathname = (pathname: string): IRoute => this.props.routes.find(item => item.path === pathname);

    /** @desc */
    subscribe = () => {
    };

    /** @desc */
    unSubscribe = () => {
    };

    /** @desc */
    goBack = (): void => {
        let {history} = Object.assign({}, this.state);
        history.splice(history.length - 2);
        this.setState((state) => ({
            ...state,
            history,
        }));
    };

    /** @desc */
    goNext = (): void => {
    };

    /** @desc */
    push = (pathname: string): void => {
        let route: IRoute = this.findRouteByPathname(pathname);
        if (route) {
            this.setState((state) => ({
                ...state,
                history: [...state.history, route],
                location: this.createLocation(pathname)
            }));
        } else {
            console.warn(`pathname = ${pathname} not found`);
        }
    };

    /** @desc */
    replace = (pathname: string): void => {
        let route: IRoute = this.findRouteByPathname(pathname);
        let {history} = Object.assign({}, this.state);
        history.splice(history.length - 2, 0, route);
        this.setState((state) => ({
            ...state,
            history,
            location: this.createLocation(pathname)
        }));
    };

    createLocation = (pathname: string): ILocation => {
        return {
            host: '',
            hostname: '',
            origin: '',
            href: '',
            pathname: pathname,
            search: '',
        };
    };

    render() {
        return (<Provider
            value={{
                action: {
                    goBack: this.goBack,
                    goNext: this.goNext,
                    push: this.push,
                    replace: this.replace,
                    subscribe: this.subscribe,
                    unSubscribe: this.unSubscribe,
                },
                ...this.state,
            }}
        >
            {this.props.children}
        </Provider>);
    }
}


export default {
    RouterProvider,
    RouterConsumer,
};
