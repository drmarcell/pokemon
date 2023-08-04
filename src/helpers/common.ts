import { PokemonType } from './interfaces';

export const BASE_URL: string = 'https://pokeapi.co/api/v2/';

export const cropFullUrlToEndpoint = (fullUrl: string): string => {
  const croppedUrl = fullUrl.split(BASE_URL)[1];
  return croppedUrl;
};

export const findPokemonType = (
  allTypes: PokemonType[],
  pokeTypeName: string,
): PokemonType | null => {
  const chosenType = allTypes.find(
    nameAndUrl => nameAndUrl.name === pokeTypeName,
  );
  return chosenType ? chosenType : null;
};

export const firstLetterToUppercase = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const findPokemonByName = (
  name: string,
  pokemonList: Array<PokemonType>,
): PokemonType | null => {
  const chosenPokemon = pokemonList.find(
    (pokemon: PokemonType): boolean => pokemon.name === name,
  );
  if (chosenPokemon) {
    return chosenPokemon;
  } else {
    return null;
  }
};

export const changePokemonCaughtState = (
  pokemonList: Array<PokemonType>,
  chosenName: string,
): Array<PokemonType> => {
  const newPokemons = [...pokemonList].map((pokemon: PokemonType) => {
    if (pokemon.name === chosenName) {
      return {
        ...pokemon,
        caught: !pokemon.caught,
      };
    } else {
      return pokemon;
    }
  });
  return newPokemons;
};

/**
 * It helps to find pokemons based on type or name
 *
 * @param filterOption option string ('type' or 'name')
 * @param filterValue value of the type or name ('pikachu', 'charmander' etc.)
 * @param listToFilter list needs to be filter
 * @returns array of PokemonType
 */
export const filterPokemons = (
  filterOption: string,
  filterValue: string,
  listToFilter: Array<PokemonType>,
): Array<PokemonType> => {
  return listToFilter.filter((pokemon: any): Array<PokemonType> => {
    return pokemon[filterOption]
      .toLowerCase()
      .includes(filterValue.toLowerCase());
  });
};

export const filterPokemonsByCaught = (
  listToFilter: Array<PokemonType>,
): Array<PokemonType> => {
  return listToFilter.filter((pokemon: any): Array<PokemonType> => {
    return pokemon.caught === true && pokemon;
  });
};
