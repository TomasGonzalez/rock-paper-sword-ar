import React, { forwardRef } from 'react';

const Fighter = (props, ref) => {
  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  );
};

export default forwardRef(Fighter);
