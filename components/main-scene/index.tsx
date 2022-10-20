import React from 'react';
import { Canvas } from '@react-three/fiber';
import { FightPlatform } from '../../3d-components';
import FightersController from '../../3d-components/fighters-controller';

function MainScene() {
  return (
    <Canvas
      style={{
        height: '100%',
        position: 'absolute',
        left: 0,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <ambientLight />
      <pointLight />
      <FightersController />
      <FightPlatform />
    </Canvas>
  );
}

export default MainScene;
