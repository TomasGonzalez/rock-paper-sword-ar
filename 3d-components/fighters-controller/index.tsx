import { memo, useRef } from 'react';
import useMainStore from '../../store/mainStore';
import { useFrame } from '@react-three/fiber';
import { Raycaster, Vector3, ArrowHelper } from 'three';
import Fighter from './fighter';

const SPEED = 0.5;
const STOP_DISTANCE = 0.2;

interface FighterType {
  key: string;
  position: number[];
  scale: number[];
  raycaster: Raycaster;
  cooldownThreshold: number;
  action: number;
  cooldown: number;
}

const fightersList: FighterType[] = [
  {
    key: 'fighter1',
    position: [1, 0.06, 0],
    scale: [0.2, 0.4, 0.2],
    cooldown: 0, //current cooldown
    cooldownThreshold: 1, // cooldown threshold for the action
    action: 0, // 0 attacking 1 walking
    raycaster: new Raycaster(),
  },
  {
    key: 'fighter2',
    position: [-1, 0.06, 0],
    scale: [0.2, 0.4, 0.2],
    cooldown: 0,
    cooldownThreshold: 1,
    action: 0,
    raycaster: new Raycaster(),
  },
];

const calculateMovement = (raycaster, delta, left, _state, handGesture) => {
  if (left) {
    return 0; //temporary behavior
  }

  const intersects = raycaster?.intersectObjects(_state.scene.children);
  switch (handGesture[0]) {
    case 2:
      if (intersects[0]?.distance > STOP_DISTANCE) {
        return left ? 0 : delta * -SPEED;
      }
      break;
    case 1:
      if (intersects[0]?.distance > STOP_DISTANCE) {
        return left ? 0 : delta * -SPEED;
      }

      break;
    default:
      break;
  }

  return 0;
};

const viewRaycast = (_state, index) => {
  _state.scene.add(
    new ArrowHelper(
      fightersList[index].raycaster.ray.direction,
      fightersList[index].raycaster.ray.origin,
      0.5,
      0xff0000
    )
  );
};

function FightersController() {
  const handGesture = useMainStore((store) => store.handGesture);
  const fightersRefs = useRef<any>([]);

  useFrame((_state, delta) => {
    if (fightersRefs.current.length) {
      fightersRefs.current.forEach((fighterRef, index) => {
        fightersList[index].raycaster.set(
          fighterRef.position,
          new Vector3(index ? 1 : -1, 0, 0)
        );

        if (fightersList[index].action) {
          fighterRef.position.x += calculateMovement(
            fightersList[index].raycaster,
            delta,
            index,
            _state,
            handGesture
          );
        } else {
        }

        // viewRaycast(_state, index);
      });
    }
  });

  return (
    <>
      {fightersList.map((fightersData, index) => (
        <Fighter
          ref={(el) => (fightersRefs.current[index] = el)}
          key={fightersData.key}
          {...fightersData}
        />
      ))}
    </>
  );
}

export default memo(FightersController);
