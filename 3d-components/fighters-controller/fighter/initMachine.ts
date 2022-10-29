import { assign, createMachine } from 'xstate';

const initMachine = (key) =>
  createMachine({
    id: key,
    initial: 'idle',
    context: {
      elapsed: 0, //current attack action time
      duration: 1, //duration of attacks
      interval: 0.1, //smoothness of speed attacks
    },
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
        invoke: {
          src: (context) => (cb) => {
            const interval = setInterval(() => {
              cb('TICK');
            }, 1000 * context.interval);

            return () => {
              clearInterval(interval);
            };
          },
        },
        on: {
          WALK: 'walk',
          FALL: 'fall',
          '': {
            target: 'walk',
            cond: (context) => {
              return context.elapsed >= context.duration;
            },
          },
          TICK: {
            actions: assign({
              elapsed: (context: any) => {
                return +(context.elapsed + context.interval).toFixed(2);
              },
            }),
          },
        },
        entry: ['shielding'],
      },
      kick: {
        invoke: {
          src: (context) => (cb) => {
            const interval = setInterval(() => {
              cb('TICK');
            }, 1000 * context.interval);

            return () => {
              clearInterval(interval);
            };
          },
        },
        on: {
          WALK: 'walk',
          FALL: 'fall',
          '': {
            target: 'walk',
            cond: (context) => {
              return context.elapsed >= context.duration;
            },
          },
          TICK: {
            actions: assign({
              elapsed: (context: any) => {
                return +(context.elapsed + context.interval).toFixed(2);
              },
            }),
          },
        },
        entry: ['kicking'],
      },
      sword: {
        invoke: {
          src: (context) => (cb) => {
            const interval = setInterval(() => {
              cb('TICK');
            }, 1000 * context.interval);

            return () => {
              clearInterval(interval);
            };
          },
        },
        on: {
          walk: 'walk',
          fall: 'fall',
          '': {
            target: 'walk',
            cond: (context) => {
              return context.elapsed >= context.duration;
            },
          },
          TICK: {
            actions: assign({
              elapsed: (context: any) => {
                return +(context.elapsed + context.interval).toFixed(2);
              },
            }),
          },
        },
        entry: ['slashing'],
      },
      fall: {},
    },
  });

export default initMachine;
