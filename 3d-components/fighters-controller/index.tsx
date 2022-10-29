// import { Instances, Fighter } from './fighter/FighterModel';
import initMachine from './fighter/initMachine';
import Fighter from './fighter';

interface FighterType {
  machine: any;
  position?: number[];
  rotation?: number[];
  scale?: number[];
  left?: boolean;
}

const fightersList: FighterType[] = [
  {
    position: [2, 0.06, 0],
    rotation: [0, Math.PI / 2, 0],
    scale: [0.5, 0.5, 0.5],
    machine: initMachine('fighter1'),
  },
  {
    position: [-2, 0.06, 0],
    rotation: [0, -Math.PI / 2, 0],
    scale: [0.5, 0.5, 0.5],
    left: true,
    machine: initMachine('fighter2'),
  },
];

function FightersController() {
  return (
    <>
      <Fighter {...fightersList[1]} />
      <Fighter {...fightersList[0]} />
    </>
  );
}

export default FightersController;
