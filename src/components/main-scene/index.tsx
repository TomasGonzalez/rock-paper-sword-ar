import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { FightPlatform } from '../../3d-components';
import FightersController from '../../3d-components/fighters-controller';
import { OrbitControls, Stage } from '@react-three/drei';

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
      <Stage environment='city'>
        <Suspense fallback={null}>
          <FightersController />
        </Suspense>
        <FightPlatform />
      </Stage>
    </Canvas>
  );
}

export default MainScene;
