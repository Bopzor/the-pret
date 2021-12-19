import { Seconds } from '../types';

type Temperature = 50 | 60 | 70 | 80 | 90 | 100;

export type Tea = {
  id: string;
  name: string;
  brand: string;
  time: Seconds;
  temperature: Temperature;
  count: number;
  archived: boolean;
};

export const createTea = (overrides: Partial<Tea> = {}): Tea => ({
  id: 'tea-1',
  name: 'Tea name',
  brand: 'Tea brand',
  time: 120,
  temperature: 80,
  count: 0,
  archived: false,
  ...overrides,
});

export const createTeas = (size = 2, overrideFunc: (tea: Tea, index: number) => Tea = (tea: Tea) => tea): Tea[] => {
  const teas: Tea[] = [];

  for (let i = 0; i < size; i++) {
    teas.push(
      overrideFunc(
        createTea({
          id: `tea-${i}`,
          name: `Tea name ${i}`,
          brand: `Tea brand ${i}`,
        }),
        i,
      ),
    );
  }

  return teas;
};
