import React from 'react';
import styled from 'styled-components';
import HandsCapture from '../components/hands-capture/index';
import Stage from '../components/stage';
import theme from '../theme';

const MainScene = styled.div`
  background-color: ${(props) => props.theme.colors.sky};
  height: 100%;
  width: 100%;
`;

export default function Page() {
  return (
    <MainScene>
      <Stage />
      {/* <HandsCapture /> */}
    </MainScene>
  );
}
