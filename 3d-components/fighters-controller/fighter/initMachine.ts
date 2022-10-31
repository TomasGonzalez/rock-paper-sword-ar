import { assign, createMachine } from 'xstate';

const STATE_TIME = 400;

const initMachine = (key) =>
  createMachine({
    id: key,
    initial: 'idle',
    states: {
      idle: {
        on: {
          WALK: 'walk',
          SHIELD: 'shield',
          KICK: 'kick',
          SWORD: 'sword',
        },
        entry: ['idling'],
      },
      walk: {
        on: {
          KICK: 'kick',
          SHIELD: 'shield',
          SWORD: 'sword',
          FALL: 'fall',
        },
        entry: [
          'walking',
          assign({
            elapsed: 0,
          }),
        ],
      },
      shield: {
        on: {
          WALK: 'walk',
          FALL: 'fall',
        },
        after: {
          [STATE_TIME]: { target: 'walk' },
        },
        entry: ['shielding'],
      },
      kick: {
        on: {
          WALK: 'walk',
          FALL: 'fall',
        },
        after: {
          [STATE_TIME]: { target: 'walk' },
        },
        entry: ['kicking'],
      },
      sword: {
        on: {
          walk: 'walk',
          fall: 'fall',
        },
        after: {
          [STATE_TIME]: { target: 'walk' },
        },
        entry: ['slashing'],
      },
      fall: {},
    },
  });

export default initMachine;
