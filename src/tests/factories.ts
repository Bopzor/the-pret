import { Tea } from '../features/teas/teasSlice';

export const createTea = (overrides?: Partial<Tea>): Tea => ({
  id: 'tea-1',
  name: 'tea 1',
  duration: 60,
  startedTimestamp: null,
  ...overrides,
});
