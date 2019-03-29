import {
  justifyContent,
  alignItems,
  alignContent,
  flex,
  flexBasis,
  flexDirection,
  flexWrap,
  display,
  fontWeight
} from 'styled-system';
import styled from 'styled-components';

/**View */
import { Box } from '../Box/Box';

export const Flex = styled(Box)`
  display: flex;
  ${justifyContent};
  ${fontWeight};
  ${alignItems};
  ${alignContent};
  ${flex};
  ${flexBasis};
  ${flexDirection};
  ${flexWrap};
  ${display};
`;

Flex.propTypes = {
  ...justifyContent.propTypes,
  ...alignItems.propTypes,
  ...alignContent.propTypes,
  ...flex.propTypes,
  ...flexBasis.propTypes,
  ...flexDirection.propTypes,
  ...flexWrap.propTypes,
  ...display.propTypes
};

export default Flex;
