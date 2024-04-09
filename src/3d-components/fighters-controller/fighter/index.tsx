import { forwardRef, useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import useFighterLogic from './hooks/useFighterLogic';
import { SkeletonUtils } from 'three-stdlib';
import { MeshStandardMaterial, DoubleSide } from 'three';



const Fighter = ({ position,color='#990000', ...props }) => {
  const { scene, animations } = useGLTF('/footballPlayer.glb');
  const cloneScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { ref } = useFighterLogic({ ...props, animations, position });

  const shirtMaterialProps = {
    color, // A bright orange color
    roughness: 0.5,   // Controls the roughness of the material, making it semi-reflective
    metalness: 0.1,   // A low metalness value, implying the shirt isn't metallic
    transparent: true, // Enables transparency
    opacity: 0.8,     // Slightly transparent
    emissive: '#000000', // Non-emissive by default, but you can set a color to make it appear as if it glows
    side: DoubleSide, // Renders both sides of the mesh
  };

  useEffect(() => {
    // Assume 'ShirtMeshName' is the name of the mesh you want to change
    // console.log(cloneScene, 'scene objects')
    scene.traverse((child) => {
      if (child.isMesh) {
        console.log(`Mesh Name: ${child.name}, Mesh Type: ${child.type}`);
      }
    });
    if (cloneScene.getObjectByName('Cube001')) {
      // Apply new material with properties provided via `shirtMaterialProps`
      cloneScene.getObjectByName('Cube004_1').material = new MeshStandardMaterial({ ...shirtMaterialProps });
      cloneScene.getObjectByName('Cube001').material = new MeshStandardMaterial({ ...shirtMaterialProps });
      cloneScene.getObjectByName('Cube002_2').material = new MeshStandardMaterial({ ...shirtMaterialProps });
      cloneScene.getObjectByName('Cube002_1').material = new MeshStandardMaterial({ ...shirtMaterialProps });
      cloneScene.getObjectByName('Cube002_3').material = new MeshStandardMaterial({ ...shirtMaterialProps });
    }
  }, [ cloneScene]);

  return (
    <group ref={ref} position={position}>
      <primitive object={cloneScene} position={[0, -0.55, 0]} {...props} />
      {/* <mesh> */}
        {/* <boxGeometry args={[1, 1, 1]} /> */}
        {/* <meshStandardMaterial transparent opacity={0} color={'red'} /> */}
      {/* </mesh> */}
    </group>
  );
};

export default forwardRef(Fighter);
useGLTF.preload('/footballPlayer.glb');