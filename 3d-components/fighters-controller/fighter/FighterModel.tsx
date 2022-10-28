import { useGLTF } from '@react-three/drei';

function FighterModel({ ref, position, ...props }) {
  const { nodes, scene } = useGLTF('3d-models/fighter/footballPlayer.glb');
  return (
    <group position={position}>
      <primitive
        ref={ref}
        position={[0, -0.55, 0]}
        geometry={nodes.football}
        object={scene}
        {...props}
      />
    </group>
  );
}

export default FighterModel;

useGLTF.preload('3d-models/fighter/footballPlayer.glb');
