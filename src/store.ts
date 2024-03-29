import { AnyAction, configureStore, Selector, ThunkAction } from '@reduxjs/toolkit';

import { AppStatePort } from './features/appState/AppStatePort';
import { CountdownPort } from './features/countdown/CountdownPort';
import countdownReducer from './features/countdown/countdownSlice';
import { DatePort } from './features/DatePort';
import teasReducer from './features/teas/teasSlice';
import { TeaStoragePort } from './features/teas/TeaStoragePort';

type Dependencies = {
  teaStorage: TeaStoragePort;
  countdown: CountdownPort;
  date: DatePort;
  appState: AppStatePort;
};

export const createStore = (dependencies: Dependencies) =>
  configureStore({
    reducer: {
      teas: teasReducer,
      countdown: countdownReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      }),
  });

type Store = ReturnType<typeof createStore>;

export type RootState = ReturnType<Store['getState']>;
export type AppDispatch = Store['dispatch'];
export type AppThunkAction<Result> = ThunkAction<Result, RootState, Dependencies, AnyAction>;
export type AppSelector<Result, Params extends unknown[]> = Selector<RootState, Result, Params>;
