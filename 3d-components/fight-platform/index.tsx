import React from 'react';

function Platform() {
  return (
    <mesh scale={[7, 0.1, 0.4]} position={[0, -0.2, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
}

function FightPlatform() {
  return <Platform />;
}

export default FightPlatform;
