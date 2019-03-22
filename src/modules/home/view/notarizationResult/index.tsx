import * as React from 'react';
import {AppConsumer} from '../../../../store/AppStore';
import Box from '../../../../components/Box/Box';
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Link from '../../../router/components/Link/Link';
import {Flex} from '../../../../components/Flex/Flex';


export class NotarizationResultPage extends React.Component {

    InsertImageHtml = (image) => {
        let imgHTML = `<img src="${image}" alt="apps for Office image1" />`;

        Office.context.document.setSelectedDataAsync(
            imgHTML, {coercionType: 'html'},
            (asyncResult) => {
                console.log('Error: ', asyncResult);
            });
    };

    render() {
        return (<Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} py={5}>
            <Box color={'color4'} textAlign={'center'} maxWidth={'300px'} mb={5} fontSize={9} lintHeght={9}>
                Транзакция успешно подписано и сохранена!
            </Box>

            <Box fontSize={7} lintHeght={9} color={'color4'} maxWidth={'300px'} mb={5}>
                Детали транзакции по номеру в реестре можно найти в <strong style={{whiteSpace: 'nowrap'}}>Key Keeper</strong>
            </Box>
            <Box fontSize={7} lintHeght={9} color={'color4'} maxWidth={'300px'} mb={9}>
                <strong>Nota bene! </strong> Если в дальнейшем вы измените что-то в этом документе, то обязательно нужно повторить
                процедуру подписи. Для этого нажмите «Редактировать»
            </Box>

            <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} mb={9}>
                <Box width={'200px'}>
                    <img
                        onClick={() => {
                            this.InsertImageHtml('http://qrcoder.ru/code/?https%3A%2F%2Femernotar.io%2F&4&0');
                        }}
                        width={'200px'}
                        height={'200px'}
                        src={'http://qrcoder.ru/code/?https%3A%2F%2Femernotar.io%2F&4&0'}
                    />
                </Box>
                <Box textAlign={'center'} maxWidth={'300px'}  fontSize={5} lintHeght={7} color={'color4'} mb={3}>
                    Нажмите на QR код и он появится в документе в месте где стоит курсор
                </Box>
            </Flex>

            <Link to={'/notarization'}>
                <ButtonBase>
                    Редагувати
                </ButtonBase>
            </Link>

        </Flex>);
    }

}


const NotarizationResultPageWithAppStoreConsumer = (props) => {

    return <AppConsumer>
        {value => {
            return <NotarizationResultPage {...value} {...props}/>;
        }}
    </AppConsumer>;
};
export default NotarizationResultPageWithAppStoreConsumer;