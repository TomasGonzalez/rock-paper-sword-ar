// import { Instances, Fighter } from './fighter/FighterModel';
import initMachine from './fighter/initMachine';
import Fighter from './fighter';
import { Vector3 } from 'three';
import { useMemo, useRef } from 'react';

interface FighterType {
  machine: any;
  position?: number[];
  rotation?: number[];
  scale?: number[];
  left?: boolean;
  direction?: Vector3;
}
function FightersController() {
  const fighter1MachineState = useRef(null)
  const fighter2MachineState = useRef(null)

  const fightersList:  FighterType[] = useMemo(()=>([
    {
      position: [2, 0.06, 0],
      rotation: [0, Math.PI / 2, 0],
      scale: [0.5, 0.5, 0.5],
      machine: initMachine('fighter1'),
      direction: new Vector3(-1, 0, 0),
    },
    {
      position: [-2, 0.06, 0],
      rotation: [0, -Math.PI / 2, 0],
      scale: [0.5, 0.5, 0.5],
      left: true,
      machine: initMachine('fighter2'),
      direction: new Vector3(1, 0, 0),
    },
  ]),[]);

  return (
    <>
      <Fighter {...fightersList[1]} fighterStateRef={fighter1MachineState} enemy={fighter2MachineState} color='#000099' />
      <Fighter {...fightersList[0]} fighterStateRef={fighter2MachineState} enemy={fighter1MachineState} />
    </>
  );
}

export default FightersController;
