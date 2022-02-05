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

export const store = createStore({});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkAction<Result> = ThunkAction<Result, RootState, Dependencies, AnyAction>;
export type AppSelector<Result, Params extends unknown[]> = Selector<RootState, Result, Params>;
