import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemon/pokemonSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
  middleware: curryGetDefaultMiddleware =>
    curryGetDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
