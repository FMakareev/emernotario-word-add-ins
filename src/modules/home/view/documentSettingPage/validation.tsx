import {IFormNotarialActionUser, IFormNotarialActionValues} from './FormNotarialAction';

export const validateFormNotarialActionUser = (translate: any) => (values: IFormNotarialActionValues) => {
    const errors: IFormNotarialActionValues = {};
    const requiredMessage = translate('validation.required');
    if (!values.numberInTheRegistry) {
        errors.numberInTheRegistry = requiredMessage;
    }
    if (!values.documentDate) {
        errors.documentDate = requiredMessage;
    }
    if (!values.documentType) {
        errors.documentType = requiredMessage;
    }

    if (values.customers && values.customers.length) {
        errors.customers = [];
        values.customers.forEach((item: IFormNotarialActionUser, index: number) => {
            if (!errors.customers[index]) {
                errors.customers[index] = {};
            }
            if (!item || !item.firstName) {
                errors.customers[index] = {
                    ...errors.customers[index],
                    firstName: requiredMessage
                };
            }
            if (!item || !item.lastName) {
                errors.customers[index] = {
                    ...errors.customers[index],
                    lastName: requiredMessage
                };
            }
            if (!item || !item.patronymic) {
                errors.customers[index] = {
                    ...errors.customers[index],
                    patronymic: requiredMessage
                };
            }
        });
    }

    return errors;
};
