import styled from 'styled-components';
import { display, space, variant } from 'styled-system';

/** Style property */
import BorderRadiusProperty from '../../styles/styleProperty/BorderRadiusProperty';
import BorderColorProperty from '../../styles/styleProperty/BorderColorProperty';
import FontSizeProperty from '../../styles/styleProperty/FontSizeProperty';
import LineHeightProperty from '../../styles/styleProperty/LineHeightProperty';
import {ISpace} from '../../styles/interfaces';

const inputSize = variant({
  key: 'variant.inputSize',
  prop: 'size',
});
const inputVariant = variant({
  key: 'variant.inputVariant',
  prop: 'variant',
});


export interface ITextFieldBase extends ISpace {
    lineHeight?: number,
    size?: string,
    fontSize?: number,
    fontFamily?: string,
    variant?: string,
    className?: string,
    [propName: string]: any,
}


/**
 * Text Field Base
 * @example ./TextFieldBase.example.md
 */
export const TextFieldBase = styled.input<ITextFieldBase>`
  ${inputVariant};
  ${inputSize};
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  ${FontSizeProperty};
  ${LineHeightProperty};
  ${BorderRadiusProperty};
  ${BorderColorProperty};
  ${display};
  ${space};

  :focus::placeholder {
    color: transparent;
  }
  :focus::-webkit-input-placeholder {
    color: transparent;
  }
  :focus:-ms-input-placeholder {
    color: transparent;
  }
  :focus::-ms-input-placeholder {
    color: transparent;
  }
`;


TextFieldBase.defaultProps = {
  size: 'lg',
  variant: 'default',
  fontFamily: 'secondary',
};

export default TextFieldBase;
