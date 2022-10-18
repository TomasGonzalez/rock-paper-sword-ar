import { useRef } from 'react';
import useMainStore from '../../../store/mainStore';
import { MeshBasicMaterialProps, useFrame } from '@react-three/fiber';

const SPEED = 0.5;

const useLogic = (left) => {
  const hitboxRef = useRef<MeshBasicMaterialProps>();
  const handGesture = useMainStore((store) => store.handGesture);

  useFrame((state, delta) => {
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
