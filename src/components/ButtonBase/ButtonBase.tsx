import styled from 'styled-components';
import {color, display, width, space, fontWeight, variant, position} from 'styled-system';

/** Style property */
import {BackgroundColorProperty} from '../../styles/styleProperty/BackgroundColorProperty';
import {LineHeightProperty} from '../../styles/styleProperty/LineHeightProperty';
import {FontSizeProperty} from '../../styles/styleProperty/FontSizeProperty';
import {BorderRadiusProperty} from '../../styles/styleProperty/BorderRadiusProperty';
import {ITextFieldBase} from '../TextFieldBase/TextFieldBase';
import {ISpace} from '../../styles/interfaces';
import {ButtonEnum} from '../../styles/variants/buttonVariant';

const buttonsVariant = variant({
    key: 'variant.buttons',
    prop: 'variant',
});
const buttonsSize = variant({
    key: 'variant.buttonSize',
    prop: 'size',
});
const buttonComment = variant({
    key: 'variant.buttonComment',
    prop: 'btnComment',
});


export interface IButtonBase extends ITextFieldBase, ISpace {
    /** Background color alias. */
    bgc?: string,
    /** Border color alias. */
    bc?: string,
    /** Font color. */
    color?: string,
    /** disabled. */
    disabled?: boolean,
    /** Active button */
    active?: boolean,
    variant?: ButtonEnum,
    size?: string,

    [propName: string]: any,
}

/**
 * Компонента обычная кнопка
 * @example ./ButtonBase.example.md
 */
export const ButtonBase = styled.button < IButtonBase > `
  border: none;
  position: relative;
  outline: none !important;
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding: 0;

  ${BorderRadiusProperty};
  ${buttonsVariant};
  ${buttonsSize};
  ${buttonComment};
  ${space};
  ${position};
  ${width};
  ${color};
  ${display};
  ${fontWeight};
  ${LineHeightProperty};
  ${FontSizeProperty};
  ${BackgroundColorProperty};
  ${BorderRadiusProperty};
`;

ButtonBase.defaultProps = {
    variant: 'raised.primary',
    size: 'medium',
};

export default ButtonBase;
