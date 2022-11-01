// import { Instances, Fighter } from './fighter/FighterModel';
import initMachine from './fighter/initMachine';
import Fighter from './fighter';
import { Vector3 } from 'three';

interface FighterType {
  machine: any;
  position?: number[];
  rotation?: number[];
  scale?: number[];
  left?: boolean;
  direction?: Vector3;
}

const fightersList: FighterType[] = [
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
];

function FightersController() {
  return (
    <>
      <Fighter {...fightersList[1]} enemy={fightersList[0]} />
      <Fighter {...fightersList[0]} enemy={fightersList[1]} />
    </>
  );
}

export default FightersController;
