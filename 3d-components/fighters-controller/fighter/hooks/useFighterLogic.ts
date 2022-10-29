import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Raycaster, Vector3 } from 'three';
import { useMachine } from '@xstate/react';
import useMainStore from '../../../../store/mainStore';
import { useAnimations } from '@react-three/drei';

const SPEED = 0.5;
const STOP_DISTANCE = 0.2;

const useFighterLogic = ({ animations, ...props }) => {
  const handGesture = useMainStore((store) => store.handGesture);
  const raycaster = useRef<any>(new Raycaster());
  const ref = useRef<any>();
  const { actions, mixer, ...animationsProps } = useAnimations(animations, ref);

  useEffect(() => {
    console.log(mixer, 'mixer');
    console.log(actions, 'mixer');
    console.log(animationsProps, 'animation props');
  }, []);

  const idleAction = () => {
    actions.walk.stop();
    actions.idle.play();
    // actions.walk.crossFadeTo(actions.idle.play());
  };

  const [fighterState, fighterSend] = useMachine(props.machine, {
    actions: {
      // action implementations
      shielding: (context, event) => {
        console.log('playing Idle animation shielding...');
        idleAction();
      },
      kicking: (context, event) => {
        console.log('playing Idle animation shielding...');
        idleAction();
      },
      slashing: (context, event) => {
        console.log('playing Idle animation shielding...');
        console.log('slashing...');
        idleAction();
      },
      idling: () => {
        console.log('playing Idle animation shielding...');
        console.log('Idling...');
        actions.idle.play();
      },
      walking: () => {
        // actions.crossFadeTo();
        actions.idle.stop();
        actions.walk.play();
        console.log('Walking testing...');
      },
    },
  });

  const calculateMovement = (state, delta) => {
    if (props.left) {
      return 0; //temporary behavior
    }

    const intersects = raycaster?.current.intersectObjects(
      state.scene.children
    );

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
