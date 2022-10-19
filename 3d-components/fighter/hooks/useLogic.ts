import { useRef } from 'react';
import useMainStore from '../../../store/mainStore';
import { MeshBasicMaterialProps, useFrame } from '@react-three/fiber';
import { Raycaster, Vector3 } from 'three';

const SPEED = 0.5;
const STOP_DISTANCE = 0.2;

const calculateMovement = (intersects, delta, left) => {
  if (left) {
    return 0; //temporary behavior
  }

  if (intersects[0]?.distance > STOP_DISTANCE) {
    return left ? 0 : delta * -SPEED;
  }
  return 0;
};

const useLogic = (left) => {
  const hitboxRef = useRef<MeshBasicMaterialProps>();
  const handGesture = useMainStore((store) => store.handGesture);
  const raycaster = new Raycaster();

  useFrame((_state, delta) => {
    raycaster.set(hitboxRef.current.position, new Vector3(left ? 1 : -1, 0, 0));

    const intersects = raycaster.intersectObjects(_state.scene.children);
    switch (handGesture[0]) {
      case 2:
        hitboxRef.current.position.x += calculateMovement(
          intersects,
          delta,
          left
        );
        break;

      case 1:
        hitboxRef.current.position.x += calculateMovement(
          intersects,
          delta,
          left
        );
        break;

      default:
        break;
    }
  });

  return { hitboxRef };
};

export default useLogic;
