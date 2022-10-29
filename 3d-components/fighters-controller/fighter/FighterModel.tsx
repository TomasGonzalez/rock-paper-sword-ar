/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, {
  useRef,
  useMemo,
  useContext,
  createContext,
  useEffect,
} from 'react';
import { useGLTF, Merged, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import useFighterLogic from './hooks/useFighterLogic';

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.SkinnedMesh;
    Cube001: THREE.SkinnedMesh;
    Cube002_1: THREE.SkinnedMesh;
    Cube002_2: THREE.SkinnedMesh;
    Cube002_3: THREE.SkinnedMesh;
    Cube003_1: THREE.SkinnedMesh;
    Cube003_2: THREE.SkinnedMesh;
    Cube004_1: THREE.SkinnedMesh;
    Cube004_2: THREE.SkinnedMesh;
    Bone: THREE.Bone;
  };
  materials: {
    white: THREE.MeshStandardMaterial;
    ['redl.001']: THREE.MeshStandardMaterial;
    ['Material.001']: THREE.MeshStandardMaterial;
    black: THREE.MeshStandardMaterial;
  };
};

type ActionName = 'EmptyAction' | 'ArmatureAction';
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

//@ts-ignore
const context = createContext();
export function Instances({ children, ...props }) {
  const { nodes, animations } = useGLTF('/footballPlayer.glb') as GLTFResult;
  const instances = useMemo(
    () => ({
      Cube: nodes.Cube,
      Cube1: nodes.Cube001,
      Cube2: nodes.Cube002_1,
      Cube3: nodes.Cube002_2,
      Cube4: nodes.Cube002_3,
      Cube5: nodes.Cube003_1,
      Cube6: nodes.Cube003_2,
      Cube7: nodes.Cube004_1,
      Cube8: nodes.Cube004_2,
    }),
    [nodes]
  );
  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (React.isValidElement(child)) {
      //@ts-ignore
      return React.cloneElement(child, { animations, nodes });
    }
    return child;
  });

  return (
    <Merged meshes={instances} {...props}>
      {(instances) => (
        <context.Provider value={instances}>
          {childrenWithProps}
        </context.Provider>
      )}
    </Merged>
  );
}

export function Fighter({
  nodes,
  animations,
  ...props
}: JSX.IntrinsicElements['group']) {
  const instances: any = useContext(context);
  const { ref: group } = useFighterLogic(props);
  const animationss = useAnimations<GLTFActions>(animations, group);

  useEffect(() => {
    console.log(animationss, 'this is actions');
    // actions.ArmatureAnimation.play();
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial opacity={0} transparent={true} />
      </mesh>
      <group name='Scene'>
        <group
          name='Empty'
          position={[0, -0.02, 5.07]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        />
        <group name='Armature' position={[0, -1.13, -0.03]}>
          <primitive object={nodes.Bone} />
          <instances.Cube name='Cube' />
          <instances.Cube1 name='Cube001' />
          <group name='Cube002'>
            <instances.Cube2 name='Cube002_1' />
            <instances.Cube3 name='Cube002_2' />
            <instances.Cube4 name='Cube002_3' />
          </group>
          <group name='Cube003'>
            <instances.Cube5 name='Cube003_1' />
            <instances.Cube6 name='Cube003_2' />
          </group>
          <group name='Cube004'>
            <instances.Cube7 name='Cube004_1' />
            <instances.Cube8 name='Cube004_2' />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/footballPlayer.glb');