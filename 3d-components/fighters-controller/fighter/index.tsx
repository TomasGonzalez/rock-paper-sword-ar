import React, { forwardRef, useEffect, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import useFighterLogic from './hooks/useFighterLogic';
import { SkeletonUtils } from 'three-stdlib';

const Fighter = ({ position, ...props }) => {
  const { nodes, materials, scene, animations } = useGLTF(
    '/footballPlayer.glb'
  );
  const { ref } = useFighterLogic({ ...props, animations });
  const cloneScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

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
