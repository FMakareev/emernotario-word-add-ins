import * as React from 'react';
import styled from 'styled-components';
import {
    borderColor,
} from 'styled-system';


export const SpeedingWheel = styled.div`
  width: 1em;
  height: 1em;
  margin: 0 auto;
  border: 0.2em solid #00649c;
  ${borderColor};

  border-radius: 50%;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: cssload-spin 500ms infinite linear;
  -o-animation: cssload-spin 500ms infinite linear;
  -ms-animation: cssload-spin 500ms infinite linear;
  -webkit-animation: cssload-spin 500ms infinite linear;
  -moz-animation: cssload-spin 500ms infinite linear;

  @keyframes cssload-spin {
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-o-keyframes cssload-spin {
    100% {
      -o-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-ms-keyframes cssload-spin {
    100% {
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes cssload-spin {
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-moz-keyframes cssload-spin {
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const Container = styled.div`
  padding: 8px;
`;

export const SmallPreLoader = () => (
  <Container>
    <SpeedingWheel />
  </Container>
);

export default SmallPreLoader;
