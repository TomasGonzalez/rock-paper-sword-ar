import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Raycaster, Vector3 } from 'three';
import { useMachine } from '@xstate/react';
import useMainStore from '../../../../store/mainStore';

const SPEED = 0.5;
const STOP_DISTANCE = 0.2;

const useFighterLogic = (props) => {
  const handGesture = useMainStore((store) => store.handGesture);
  const [fighterState, fighterSend] = useMachine(props.machine);
  const raycaster = useRef<any>(new Raycaster());
  const ref = useRef<any>();

  const calculateMovement = (state, delta) => {
    if (props.left) {
      return 0; //temporary behavior
    }

    const intersects = raycaster?.current.intersectObjects(
      state.scene.children
    );

    // console.log(intersects[0], 'this are intersects');
    if (intersects[0]?.distance < STOP_DISTANCE) {
      return 0;
    }

    return props.left ? 0 : delta * -SPEED;
  };

  useEffect(() => {
    switch (handGesture[0]) {
      case 0:
        fighterSend('KICK');
        break;

      case 1:
        fighterSend('SHIELD');
        break;

      case 2:
        fighterSend('SWORD');
    }
  }, [handGesture, fighterSend]);

  useFrame((state, delta) => {
    if (raycaster.current && ref.current && fighterState.matches('walk')) {
      raycaster.current.set(
        ref.current.position,
        new Vector3(props.left ? 1 : -1, 0, 0)
      );
      ref.current.position.x += calculateMovement(state, delta);
    }
  });

  return { ref };
};

export default useFighterLogic;
