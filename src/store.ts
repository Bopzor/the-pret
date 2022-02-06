import { AnyAction, configureStore, Selector, ThunkAction } from '@reduxjs/toolkit';

import { CountdownPort } from './features/countdown/CountdownPort';
import countdownReducer from './features/countdown/countdownSlice';

type Dependencies = {
  countdown: CountdownPort;
};

export const createStore = (dependencies: Dependencies) =>
  configureStore({
    reducer: {
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
