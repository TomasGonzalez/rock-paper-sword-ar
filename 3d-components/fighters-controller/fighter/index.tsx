import React, { forwardRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import useFighterLogic from './hooks/useFighterLogic';
import { SkeletonUtils } from 'three-stdlib';

const Fighter = ({ position, ...props }) => {
  const { scene, animations } = useGLTF('/footballPlayer.glb');
  const cloneScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { ref } = useFighterLogic({ ...props, animations, position });

  return (
    <group ref={ref} position={position}>
      <primitive object={cloneScene} position={[0, -0.55, 0]} {...props} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial transparent opacity={0} color={'red'} />
      </mesh>
    </group>
  );
};

export default forwardRef(Fighter);
useGLTF.preload('/footballPlayer.glb');
