import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonType } from '../../helpers/interfaces';
import type { RootState } from '../store';

interface PokemonState {
  currentType: PokemonType;
  pokemons: Array<PokemonType>;
  currentPokemon: PokemonType;
}

const initialState: PokemonState = {
  currentType: {
    name: '',
    url: '',
    caught: false,
  },
  pokemons: [],
  currentPokemon: {
    id: '',
    name: '',
    url: '',
    type: '',
    caught: false,
  },
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setCurrentType: (state, action: PayloadAction<PokemonType>) => {
      state.currentType = action.payload;
    },
    setPokemons: (state, action: PayloadAction<Array<PokemonType>>) => {
      state.pokemons = action.payload;
    },
    setCurrentPokemon: (state, action: PayloadAction<PokemonType>) => {
      state.currentPokemon = action.payload;
    },
  },
});

export const { setCurrentType, setPokemons, setCurrentPokemon } =
  pokemonSlice.actions;

export const selectCurrentType = (state: RootState) =>
  state.pokemon.currentType;

export default pokemonSlice.reducer;
