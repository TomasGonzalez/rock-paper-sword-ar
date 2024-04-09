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
  const [setHandPosition, setHandGesture2, gameOver] = useMainStore((state) => [state.setHandGesture, state.setHandGesture2, state.gameOver]);

  /*
   *  We should never re-render handsCaputure, as it produces errors,
   *  to update the state we should pass a callback and updated it in the parent component instead.
   */

  const updateHandsGesture2 = useCallback(
    (newHandPosition) => {
      setHandPosition(newHandPosition);
    },
    [setHandPosition]
  );
  const updateHandsGesture = useCallback(
    (newHandPosition) => {
      setHandGesture2(newHandPosition);
    },
    [setHandGesture2]
  );

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <div style={{
          position: 'absolute', 
          alignSelf: 'center', 
          left: '40%', 
          fontSize: 150, 
          zIndex: 100000,
          textAlign: 'center'
          }}>
          {gameOver} 
        </div>
        <HandsCapture updateHandsGesture={updateHandsGesture} updateHandsGesture2={updateHandsGesture2} />
        <MainScene />
      </MainContainer>
    </ThemeProvider>
  );
}
