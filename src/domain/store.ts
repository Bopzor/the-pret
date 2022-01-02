import { configureStore } from '@reduxjs/toolkit';
import { Action as ReduxAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IdGateway } from './IdGateway';
import teaReducer from './tea/tea.slice';
import { TeaGateway } from './tea/TeaGateway';
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
  teaGateway: {},
  timerGateway: {},
} as Dependencies);

export type Dependencies = {
  idGateway: IdGateway;
  teaGateway: TeaGateway;
  timerGateway: TimerGateway;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppSelector<Result> = (state: RootState) => Result;

export type ThunkResult<R> = ThunkAction<R, RootState, Dependencies, ReduxAction>;

export default store;
