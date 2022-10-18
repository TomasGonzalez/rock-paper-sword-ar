import React from 'react';
import useLogic from './hooks/useLogic';

const HitBox = ({ hitboxRef, left }) => (
  <mesh
    ref={hitboxRef}
    scale={[0.2, 0.4, 0.2]}
    position={[left ? -1 : 1, -1.75, 0]}
  >
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color={'red'} />
  </mesh>
);

function Fighter({ left = false }) {
  const { hitboxRef } = useLogic(left);

  return <HitBox hitboxRef={hitboxRef} left={left} />;
}

export default Fighter;
