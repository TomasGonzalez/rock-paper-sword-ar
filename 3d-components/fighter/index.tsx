import React, { useRef } from 'react';
import { MeshBasicMaterialProps, useFrame } from '@react-three/fiber';
import { KeyboardControls, useKeyboardControls } from '@react-three/drei';

const HitBox = ({ hitboxRef }) => (
  <mesh ref={hitboxRef} scale={[0.2, 0.4, 0.2]} position={[0, -1.75, 0]}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color={'red'} />
  </mesh>
);

function Fighter() {
  const [sub, get] = useKeyboardControls();
  const hitboxRef = useRef<MeshBasicMaterialProps>();

  useFrame((state, delta) => {
    const pressedForward = get().forward;
    const pressedBackward = get().backward;

    if (pressedBackward && hitboxRef.current) {
      hitboxRef.current.position.x += delta * -3;
    }

    if (pressedForward && hitboxRef.current) {
      hitboxRef.current.position.x += delta * 3;
    }
  });

  return <HitBox hitboxRef={hitboxRef} />;
}

const FighterWrapper = () => {
  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
        { name: 'backward', keys: ['ArrowUp', 's', 'S'] },
      ]}
    >
      <Fighter />
    </KeyboardControls>
  );
};

export default FighterWrapper;
