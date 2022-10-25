import React, { forwardRef, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Raycaster, Vector3 } from 'three';
import { Machine } from 'xstate';
import useMainStore from '../../../store/mainStore';

const SPEED = 0.5;
const STOP_DISTANCE = 0.2;

const createMachine = (props) => {
  const machine = Machine({
    id: props.key,
    initial: 'idle',
    states: {
      idle: {
        on: {
          WALK: 'walk',
        },
      },
      walk: {},
      shield: {},
      kick: {},
      sword: {},
      fall: {},
    },
    on: {
      CHANGE: [
        {
          target: 'idle',
          actions: (_, e) => {
            console.log("I'm idle");
          },
        },
      ],
    },
  });
  return machine;
};

const Fighter = (props) => {
  const handGesture = useMainStore((store) => store.handGesture);
  const raycaster = useRef<any>(new Raycaster());
  const machine = useRef(createMachine(props));
  const ref = useRef<any>();

  const calculateMovement = (state, delta) => {
    if (props.left) {
      return 0; //temporary behavior
    }

    const intersects = raycaster?.current.intersectObjects(
      state.scene.children
    );

    console.log(intersects[0], 'this are intersects');
    if (intersects[0]?.distance < 0.4) {
      return 0;
    }

    return props.left ? 0 : delta * -SPEED;
  };

  useFrame((state, delta) => {
    if (raycaster.current && ref.current) {
      raycaster.current.set(
        ref.current.position,
        new Vector3(props.left ? 1 : -1, 0, 0)
      );
      ref.current.position.x += calculateMovement(state, delta);
    }
  });

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  );
};

export default forwardRef(Fighter);
