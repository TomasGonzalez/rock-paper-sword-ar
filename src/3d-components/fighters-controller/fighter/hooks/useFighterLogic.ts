import { useRef, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Raycaster, Vector3, ArrowHelper } from 'three';
import { useActor, useInterpret, useMachine } from '@xstate/react';
import { useAnimations } from '@react-three/drei';
import _ from 'lodash';
import useMainStore from '../../../../store/mainStore';

const SPEED = 0.5;
const STOP_DISTANCE = 0.5;
const ANIMATION_TRANSITION_SPEED = 0.1;

const useFighterLogic = ({ enemy: enemyState, fighterStateRef, animations, ...props }: any) => {
  const [handGesture, setGameOver] = useMainStore((store) => [props.left ? store.handGesture : store.handGesture2, store.setGameOver]);
  const raycaster = useRef<any>(
    new Raycaster(
      new Vector3(props.position[0], props.position[1], props.position[2]),
      props.direction
    )
  );
  const ref = useRef<any>();
  const arrowHelperRef = useRef(); // Ref for the ArrowHelper
  const { actions, mixer, ...animationsProps } = useAnimations(animations, ref);
  const state = useThree();

  useEffect(() => {
    // Initialize ArrowHelper for visualization
    if (!arrowHelperRef.current) {
      const arrowHelper = new ArrowHelper(
        new Vector3(1, 0, 0), // Initial direction
        raycaster.current.ray.origin, // Initial position
        10, // Length of the arrow
        'transparent'
      );
      state.scene.add(arrowHelper); // Add ArrowHelper to the scene
      arrowHelperRef.current = arrowHelper;
    }
  }, [state.scene]);


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
      falling: () => {
        animationTransition(actions.walk, actions.idle);
        console.log('falling');
      },
      walking: () => {
        animationTransition(actions.idle, actions.walk);
      },
    },
    guards: {
      isColliding: (context, event) => {
        //this is supposed to be a pure function, I know. But I'm unwilling to spend more time on this.
        const intersects = raycaster?.current.intersectObjects( state.scene.children);
        // console.log(intersects, "these are intersects")
        if (!intersects.length) return false;
        return (
          intersects[0]?.distance < STOP_DISTANCE && intersects[0]?.distance > 0
        );
      },
    },
  });

  useEffect(() => {
    fighterStateRef.current = fighterState
  },[fighterState])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttleSetIDLE = () => {
    if (fighterState.matches('walk')) {
      fighterSend('IDLE');
    }
  };

  const calculateMovement = (state, delta, speed= SPEED) => {
    if (props.left) return delta * speed; //temporary behavior
    return delta * -speed;
  };

  const calculateHit = () => {
    //If enemy is in advantage rock paper sissor state and close enougth, and fighter is not in fall state?
    // Then place fighter to fall state.
    // if(props.left && props.position < ) {

    // }

    console.log(fighterState.value, fighterState.matches('fall'))

    if(fighterState.matches('fall')) return console.log('no change......')

    // console.log(enemyState.current.value, 'enemy State')
    if (fighterState.matches('sword') && enemyState.current.matches('shield')) {
      console.log('is this working1');
      fighterSend('FALL');
    }
    if (fighterState.matches('shield') && enemyState.current.matches('kick')) {
      console.log('is this working2');
      fighterSend('FALL');
    }
    if (fighterState.matches('kick') && enemyState.current.matches('sword')) {
      console.log('is this working3');
      fighterSend('FALL');
    }
    if (
      (fighterState.matches('walk') || fighterState.matches('idle')) &&
      (enemyState.current.matches('sword') ||
        enemyState.current.matches('shield') ||
        enemyState.current.matches('kick'))
    ) {
      console.log('is this working attack should fall');
      fighterSend('FALL');
    }
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
    const intersects = raycaster?.current.intersectObjects(state.scene.children)
    if (props.left && ref.current.position.x < -3.4) setGameOver('Game Over - Red Wins')
    if (ref.current.position.x > 3.4) setGameOver('Game Over - Blue Wins')

    if (intersects[0]?.distance < STOP_DISTANCE) {
      calculateHit();
      throttleSetIDLE();
    }

    if(raycaster.current && ref.current && fighterState.matches('fall')){
      console.log('falling')
      raycaster.current.set(ref.current.position, new Vector3(props.left ? 1 : -1, 0, 0));
      ref.current.position.x -= calculateMovement(state, delta, 2);
    }

    if (arrowHelperRef.current && raycaster.current) {
      arrowHelperRef.current.position.copy(raycaster.current.ray.origin);
      arrowHelperRef.current.setDirection(raycaster.current.ray.direction);
    }

    if (raycaster.current && ref.current && fighterState.matches('walk')) {
      raycaster.current.set(ref.current.position, new Vector3(props.left ? 1 : -1, 0, 0));
      ref.current.position.x += calculateMovement(state, delta);
    }
  });

  return { ref };
};

export default useFighterLogic;
