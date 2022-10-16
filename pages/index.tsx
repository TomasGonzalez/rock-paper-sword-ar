import React from 'react';
import styled from 'styled-components';
import HandsCapture from '../components/hands-capture/index';
import MainScene from '../components/main-scene';

const MainContainer = styled.div`
  background-color: ${(props) => props.theme.colors.sky};
  height: 100%;
  width: 100%;
`;

export default function Page() {
  return (
    <MainContainer>
      <HandsCapture />
      <MainScene />
    </MainContainer>
  );
}
