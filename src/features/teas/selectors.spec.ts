import { createTea } from '../../tests/factories';
import Store from '../../tests/Store';
import { setRemainingTime } from '../countdown/countdownSlice';

import { selectTeaRemainingTimeDisplay, selectTeaTemperatureCelsius, setTeas } from './teasSlice';

describe('selectTeaRemainingTimeDisplay', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('displays remaining time as minutes and seconds', () => {
    const tea = createTea({ duration: 60 });
    store.dispatch(setTeas([tea]));

    expect(store.select(selectTeaRemainingTimeDisplay, tea.id)).toBe('01:00');

    store.dispatch(setRemainingTime(45));
    expect(store.select(selectTeaRemainingTimeDisplay, tea.id)).toBe('00:45');
  });
});

describe('selectTeaTemperatureCelsius', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('displays tea temperature with celsius unit', () => {
    const tea = createTea({ temperature: 90 });
    store.dispatch(setTeas([tea]));

    expect(store.select(selectTeaTemperatureCelsius, tea.id)).toMatchObject({ value: 90, unit: '°C' });
  });
});
