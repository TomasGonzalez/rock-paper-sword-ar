import { useRef } from 'react';
import useMainStore from '../../../store/mainStore';
import { MeshBasicMaterialProps, useFrame } from '@react-three/fiber';
import { ArrowHelper, Raycaster, Vector3 } from 'three';

const SPEED = 0.5;

const handleMovement = () => {};

const useLogic = (left) => {
  const hitboxRef = useRef<MeshBasicMaterialProps>();
  const handGesture = useMainStore((store) => store.handGesture);
  const raycaster = new Raycaster();
  const inRange = useRef(false);
  let arrow = new ArrowHelper(
    raycaster.ray.direction,
    raycaster.ray.origin,
    1,
    Math.random() * 0xffffff
  );

  useFrame((_state, delta) => {
    raycaster.set(hitboxRef.current.position, new Vector3(left ? 1 : -1, 0, 0));
    _state.scene.remove(arrow);
    arrow = new ArrowHelper(
      raycaster.ray.direction,
      raycaster.ray.origin,
      1,
      Math.random() * 0xffffff
    );

    _state.scene.add(arrow);

    switch (handGesture[0]) {
      case 2:
        hitboxRef.current.position.x += left ? 0 : delta * -SPEED;
        break;

      case 1:
        hitboxRef.current.position.x += left ? 0 : delta * SPEED;
        break;

      default:
        break;
    }
  });

  return { hitboxRef };
};

export default useLogic;
