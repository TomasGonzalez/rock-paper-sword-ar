import React, { useCallback } from 'react';

import styled, { ThemeProvider } from 'styled-components';
import HandsCapture from './components/hands-capture/index';
import MainScene from './components/main-scene';
import useMainStore from './store/mainStore';
import theme from '../theme';

const MainContainer = styled.div`
  background-color: ${(props) => props.theme.colors.sky};
  height: 100%;
  width: 100%;
`;

export default function App() {
  const setHandPosition = useMainStore((state) => state.setHandGesture);

  /*
   *  We should never re-render handsCaputure, as it produces errors,
   *  to update the state we should pass a callback and updated it in the parent component instead.
   */

  const updateHandsGesture = useCallback(
    (newHandPosition) => {
      setHandPosition(newHandPosition);
    },
    [setHandPosition]
  );

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <HandsCapture updateHandsGesture={updateHandsGesture} />
        <MainScene />
      </MainContainer>
    </ThemeProvider>
  );
}
