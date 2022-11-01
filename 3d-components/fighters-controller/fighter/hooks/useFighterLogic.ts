import { useRef, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Raycaster, Vector3 } from 'three';
import { useMachine } from '@xstate/react';
import { useAnimations } from '@react-three/drei';
import _ from 'lodash';
import useMainStore from '../../../../store/mainStore';

const SPEED = 0.5;
const STOP_DISTANCE = 0.2;
const ANIMATION_TRANSITION_SPEED = 0.1;

const useFighterLogic = ({ animations, ...props }) => {
  const handGesture = useMainStore((store) => store.handGesture);
  const raycaster = useRef<any>(new Raycaster());
  const ref = useRef<any>();
  const { actions, mixer, ...animationsProps } = useAnimations(animations, ref);
  const state = useThree();

  const animationTransition = (a, b) => {
    mixer.stopAllAction();
    a.play();
    a.crossFadeTo(b, ANIMATION_TRANSITION_SPEED);
    b.play();
  };

  const [fighterState, fighterSend] = useMachine(props.machine, {
    actions: {
      // action implementations
      shielding: (context, event) => {
        animationTransition(actions.walk, actions.shielding);
      },
      kicking: (context, event) => {
        animationTransition(actions.walk, actions.kick);
      },
      slashing: (context, event) => {
        animationTransition(actions.walk, actions.sword_slash);
      },
      idling: () => {
        animationTransition(actions.walk, actions.idle);
      },
      walking: () => {
        animationTransition(actions.idle, actions.walk);
      },
    },
    guards: {
      isColliding: (context, event) => {
        //this is supposed to be a pure function, I know. But I'm unwilling to spend more time on this.
        const intersects = raycaster?.current.intersectObjects(
          state.scene.children
        );
        if (!intersects.length) return true;
        return (
          intersects[0]?.distance < STOP_DISTANCE && intersects[0]?.distance > 0
        );
      },
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetIDLE = useCallback(
    _.debounce(() => fighterSend('IDLE'), 200),
    [fighterSend]
  );

  const calculateMovement = (state, delta) => {
    if (props.left) {
      return 0; //temporary behavior
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
    const intersects = raycaster?.current.intersectObjects(
      state.scene.children
    );

    if (
      intersects[0]?.distance < STOP_DISTANCE &&
      intersects[0]?.distance > 0
    ) {
      debouncedSetIDLE();
    }

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
