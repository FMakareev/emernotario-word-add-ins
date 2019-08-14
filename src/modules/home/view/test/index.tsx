import * as React from 'react';
import {AppConsumer, IAppContextProps} from '../../../../store/AppStore';
import {IKeyKeeperApiResponse, KeyKeeperApi} from '../../../../keyKeeperApi';

interface ITestPageProps extends IAppContextProps {
    [propName: string]: any,
}

export class TestPage extends React.Component<ITestPageProps, any> {

    keyKeeper = null;
    state = {
        getHash512DataOfNotarisation: null,
        getHash512DateOfDocumentAndNotary: null,
        getHash512DocumentContent: null,
    };


    constructor(props) {
        super(props);
        this.keyKeeper = new KeyKeeperApi();
    }
    render() {

        return (<div>
            <div>
                <button onClick={() => {
                    const res = this.props.getHash512DataOfNotarisation();
                    this.setState({
                        getHash512DataOfNotarisation: res
                    });
                }}>
                    getHash512DataOfNotarisation
                </button>
                <div>
                    {this.state.getHash512DataOfNotarisation}
                </div>
            </div>

            <div>
                <button onClick={() => {
                    const res = this.props.getHash512DateOfDocumentAndNotary();
                    this.setState({
                        getHash512DateOfDocumentAndNotary: res
                    });
                }}>
                    getHash512DateOfDocumentAndNotary
                </button>
                <div>
                    {this.state.getHash512DateOfDocumentAndNotary}
                </div>
            </div>
            <div>
                <button onClick={async () => {
                    const res = await this.props.getHash512DocumentContent();
                    this.setState({
                        getHash512DocumentContent: res
                    });
                }}>
                    getHash512DocumentContent
                </button>
                <div>
                    {this.state.getHash512DocumentContent}
                </div>
            </div>
            <div>
                <button onClick={async () => {
                    const res = await this.props.initAppProvider();
                    console.log(res);
                }}>
                    initAppProvider
                </button>
            </div>
            <div>
                <button onClick={async () => {
                    const res: IKeyKeeperApiResponse = await this.keyKeeper.name_show();
                    console.log(res);
                }}>
                    this.keyKeeper
                </button>
            </div>
            <div>
                <button onClick={async () => {
                    const res: IKeyKeeperApiResponse = await this.keyKeeper.getbalance();
                    console.log(res);
                }}>
                    this.getbalance
                </button>
            </div>


        </div>);
    }
}

const TestPageWithAppStore = (props) => {

    return <AppConsumer>
        {value => {
            return <TestPage {...value} {...props}/>;
        }}
    </AppConsumer>;
};

export default TestPageWithAppStore;