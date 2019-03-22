import * as React from 'react';
import FormNotarialAction from './FormNotarialAction';
import Box from '../../../../components/Box/Box';
import {AppConsumer, IAppContextProps} from '../../../../store/AppStore';


interface INotarialActionPageProps extends IAppContextProps {
    [propName: string]: any,
}

interface INotarialActionPageState {
    [propName: string]: any,
}


export class NotarialActionPage extends React.Component<INotarialActionPageProps, INotarialActionPageState> {

    onSubmit = async (values: object) => {
        this.props.setNotarizationDataDataToAppStore(values);
    };

    render() {
        const {notarizationData} = this.props;
        return (<Box py={5}>
            <FormNotarialAction initialValues={notarizationData} onSubmit={this.onSubmit}/>
        </Box>);
    }
}


const NotarialActionPageWithAppStoreConsumer = (props) => {

    return <AppConsumer>
        {value => {
            return <NotarialActionPage {...value} {...props}/>;
        }}
    </AppConsumer>;
};
export default NotarialActionPageWithAppStoreConsumer;
