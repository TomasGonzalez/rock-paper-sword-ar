import { assign, createMachine } from 'xstate';

const initMachine = (key) =>
  createMachine(
    {
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
            IDLE: 'idle',
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
          after: [
            { delay: 'ACTION_DELAY', target: 'idle', cond: 'isColliding' },
            { delay: 'ACTION_DELAY', target: 'walk' },
          ],
          entry: ['shielding'],
        },
        kick: {
          on: {
            WALK: 'walk',
            FALL: 'fall',
          },
          after: [
            { delay: 'ACTION_DELAY', target: 'idle', cond: 'isColliding' },
            { delay: 'ACTION_DELAY', target: 'walk' },
          ],
          entry: ['kicking'],
        },
        sword: {
          on: {
            walk: 'walk',
            fall: 'fall',
          },
          after: [
            { delay: 'ACTION_DELAY', target: 'idle', cond: 'isColliding' },
            { delay: 'ACTION_DELAY', target: 'walk' },
          ],
          entry: ['slashing'],
        },
        fall: {},
      },
    },
    {
      delays: {
        ACTION_DELAY: 400,
      },
    }
  );

export default initMachine;
