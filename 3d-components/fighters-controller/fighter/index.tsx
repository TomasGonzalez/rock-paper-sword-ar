import React, { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import useFighterLogic from './hooks/useFighterLogic';

const Fighter = ({ position, ...props }) => {
  const { ref } = useFighterLogic(props);
  const { nodes, materials, scene } = useGLTF(
    '3d-models/fighter/footballPlayer.glb'
  );

  return (
    <group position={position}>
      <primitive
        ref={ref}
        position={[0, 0.4, 0]}
        geometry={nodes.football}
        object={scene}
        {...props}
      />
      <mesh>
        {/* <boxGeometry args={[1, 1, 1]} /> */}
        <meshStandardMaterial color={'red'} />
      </mesh>
    </group>
  );
};

export default forwardRef(Fighter);
