import React, { forwardRef, useCallback, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import useFighterLogic from './hooks/useFighterLogic';

const Fighter = ({ position, ...props }) => {
  const { ref } = useFighterLogic(props);
  const { nodes, materials, scene } = useGLTF(
    '3d-models/fighter/footballPlayer.glb'
  );

  return (
    <group>
      <primitive ref={ref} object={scene} position={[0, -0.55, 0]} {...props} />
      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'red'} />
      </mesh> */}
    </group>
  );
};

export default forwardRef(Fighter);
useGLTF.preload('3d-models/fighter/footballPlayer.glb');
