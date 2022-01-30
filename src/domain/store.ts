import { configureStore } from '@reduxjs/toolkit';
import { Action as ReduxAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IdGateway } from './IdGateway';
import teaReducer from './tea/tea.slice';
import { TeaStoreGateway, TeaTimerGateway } from './tea/TeaGateways';
import timerReducer from './timer/timer.slice';
import { TimerGateway } from './timer/TimerGateway';

export const createStore = <Deps extends Dependencies>(dependencies: Deps) =>
  configureStore({
    reducer: {
      teas: teaReducer,
      timer: timerReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      }),
  });

const store = createStore<Dependencies>({
  idGateway: {},
  teaStoreGateway: {},
  teaTimerGateway: {},
  timerGateway: {},
} as Dependencies);

export type Dependencies = {
  idGateway: IdGateway;
  teaStoreGateway: TeaStoreGateway;
  teaTimerGateway: TeaTimerGateway;
  timerGateway: TimerGateway;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppSelector<Result> = (state: RootState) => Result;

export type ThunkResult<R> = ThunkAction<R, RootState, Dependencies, ReduxAction>;

export default store;
