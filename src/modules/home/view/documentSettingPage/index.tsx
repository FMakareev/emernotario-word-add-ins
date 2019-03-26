import * as React from 'react';
import FormNotarialAction, {IFormNotarialActionValues} from './FormNotarialAction';
import Box from '../../../../components/Box/Box';
import {AppConsumer, IAppContextProps} from '../../../../store/AppStore';
import {Translate} from 'react-localize-redux';
import Flex from '../../../../components/Flex/Flex';


interface INotarialActionPageProps extends IAppContextProps {
    [propName: string]: any,
}

interface INotarialActionPageState {
    [propName: string]: any,
}


export class DocumentSettingPage extends React.Component<INotarialActionPageProps, INotarialActionPageState> {

    onSubmit = async (values: IFormNotarialActionValues) => {
        console.log(values);
    };

    onSaveDocument = (values: IFormNotarialActionValues) => {
        this.props.setNotarizationDataDataToAppStore(values);
    };

    render() {
        const {notarizationData} = this.props;
        return (<Flex alignItems={'center'} flexDirection={'column'}>
            {/*<Box textAlign={'center'}  fontSize={5} lintHeght={7} mb={9} maxWidth={'320px'}>*/}
                {/*<Translate id={'notaryAction'}>*/}
                    {/*Виділіть слово та натисніть на відповідне поле для заповнення*/}
                {/*</Translate>*/}
            {/*</Box>*/}
            <Box fontSize={7} lintHeght={9} fontWeight={'bold'} textAlign={'center'} mb={5} maxWidth={'320px'}>
                <Translate id={'documentPage.dataOfParticipantsOfTheNotarialAct'}/>
            </Box>
            <FormNotarialAction initialValues={notarizationData} onSaveDocument={this.onSaveDocument} onSubmit={this.onSubmit}/>
        </Flex>);
    }
}


const DocumentSettingPageWithAppStoreConsumer = (props) => {

    return (<AppConsumer>
        {value => {
            return <DocumentSettingPage {...value} {...props}/>;
        }}
    </AppConsumer>);
};
export default DocumentSettingPageWithAppStoreConsumer;
