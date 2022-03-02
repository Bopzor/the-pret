import { Tea } from '../features/teas/teasSlice';

export const createTea = (overrides?: Partial<Tea>): Tea => ({
  id: 'tea-1',
  name: 'tea 1',
  brand: 'tea brand',
  temperature: 90,
  duration: 60,
  startedTimestamp: null,
  notificationId: null,
  isReady: false,
  ...overrides,
});
