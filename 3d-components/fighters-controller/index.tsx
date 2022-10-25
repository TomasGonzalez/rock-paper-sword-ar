import { memo, useRef } from 'react';
import Fighter from './fighter';

interface FighterType {
  key: string;
  position: number[];
  scale: number[];
  left?: boolean;
}

const fightersList: FighterType[] = [
  {
    key: 'fighter1',
    position: [1, 0.06, 0],
    scale: [0.2, 0.4, 0.2],
  },
  {
    key: 'fighter2',
    position: [-1, 0.06, 0],
    scale: [0.2, 0.4, 0.2],
    left: true,
  },
];

function FightersController() {
  return (
    <>
      {fightersList.map((fightersData, index) => (
        <Fighter key={fightersData.key} {...fightersData} />
      ))}
    </>
  );
}

export default memo(FightersController);
