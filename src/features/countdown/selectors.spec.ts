import Store from '../../tests/Store';

import { selectRemainingTimeDisplay, setRemainingTime } from './countdownSlice';

describe('selectRemainingTimeDisplay', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it.each([
    { remainingTime: 60, expected: '01:00' },
    { remainingTime: 121, expected: '02:01' },
    { remainingTime: 0, expected: '00:00' },
    { remainingTime: null, expected: undefined },
  ])('display remaining time as minutes and seconds', ({ remainingTime, expected }) => {
    store.dispatch(setRemainingTime(remainingTime));
    expect(store.select(selectRemainingTimeDisplay)).toBe(expected);
  });
});
