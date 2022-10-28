import { memo } from 'react';
import Fighter from './fighter';
import initMachine from './fighter/initMachine';

interface FighterType {
  idKey: string;
  machine: any;
  position?: number[];
  scale?: number[];
  left?: boolean;
}

const fightersList: FighterType[] = [
  (() => {
    const id = 'fighter1';
    return {
      idKey: id,
      position: [1, 0.06, 0],
      rotation: [0, Math.PI / 2, 0],
      scale: [0.5, 0.5, 0.5],
      machine: initMachine(id),
    };
  })(),
  (() => {
    const id = 'fighter2';
    return {
      idKey: id,
      position: [-1, 0.06, 0],
      rotation: [0, -Math.PI / 2, 0],
      scale: [0.5, 0.5, 0.5],
      left: true,
      machine: initMachine(id),
    };
  })(),
];

function FightersController() {
  return (
    <>
      {fightersList.map((fightersData) => (
        <Fighter key={fightersData.idKey} {...fightersData} />
      ))}
    </>
  );
}

export default memo(FightersController);
