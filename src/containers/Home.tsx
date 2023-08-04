import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import useFetch from '../hooks/useFetch';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setPokemons } from '../store/pokemon/pokemonSlice';
import { PokemonList } from '../components/PokemonList';
import { PokemonType } from '../helpers/interfaces';
import { FilterOptions } from '../helpers/enums';
import { CustomDropdown } from '../components/CustomDropdown';
import {
  changePokemonCaughtState,
  cropFullUrlToEndpoint,
  filterPokemons,
  filterPokemonsByCaught,
  findPokemonByName,
  findPokemonType,
} from '../helpers/common';
import { Loader } from '../components/Loader';
import { handleFetch } from '../services/pokemonService';
import { HomeProps } from '../helpers/types';

interface PokemonsOfATypeServerResponse {
  pokemon: {
    name: string;
    url: string;
  };
}

const Home = ({ navigation }: HomeProps): JSX.Element => {
  const currentType: PokemonType = useAppSelector(
    state => state.pokemon.currentType,
  );
  const pokemons: PokemonType[] = useAppSelector(
    state => state.pokemon.pokemons,
  );
  const dispatch = useAppDispatch();
  const { fetchHookData, fetchHookError, fetchHookLoading } =
    useFetch<any>('type/');
  const [pokemonTypes, setPokemonTypes] = useState<Array<PokemonType> | null>(null);
  const [selectorOptions, setSelectorOptions] = useState<string[] | null>(null);
  const [filteredPokemons, setFilteredPokemons] = useState<Array<PokemonType>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filterOption, setFilterOption] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const [isDropdownClear, setIsDropdownClear] = useState<boolean>(false);
  const [searchfield, setSearchfield] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const callHandleFetch = async (): Promise<void> => {
    if (pokemonTypes) {
      let tempSelectorOptions: Array<string> = [];
      let tempPokemons: Array<PokemonType> = [];

      setIsLoading(true);
      await Promise.all(
        pokemonTypes.map(async (type: PokemonType): Promise<void> => {
          tempSelectorOptions.push(type.name);
          try {
            const result = await handleFetch(cropFullUrlToEndpoint(type.url));
            result.pokemon.forEach(
              (pokemon: PokemonsOfATypeServerResponse): void => {
                tempPokemons.push({
                  name: pokemon.pokemon.name,
                  url: pokemon.pokemon.url,
                  type: type.name,
                  caught: false,
                });
              },
            );
          } catch (err) {
            callErrorAlert('Pokemons are unavailable on the server');
          }
        }),
      );
      setIsLoading(false);
      dispatch(setPokemons(tempPokemons));
      setFilteredPokemons(tempPokemons);
      setSelectorOptions(tempSelectorOptions);
    }
  };

  const callErrorAlert = (errorMessage: string): void => {
    return Alert.alert('Error!', errorMessage, [
      {
        text: 'Close',
        onPress: () => {
          navigation.navigate('Home');
        },
      },
    ]);
  };

  const handleCatchButtonPress = (pokemonName: string): void => {
    const newPokemonList = changePokemonCaughtState(pokemons, pokemonName);
    dispatch(setPokemons(newPokemonList));
  };

  const handlePokemonItemPress = (pokemonName: string): void => {
    const chosenPokemon = findPokemonByName(pokemonName, pokemons);
    if (chosenPokemon) {
      handleNavigation(chosenPokemon);
    }
  };

  const handleNavigation = (pokemon: PokemonType): void => {
    navigation.navigate('Profile', { pokemon, filteredPokemons });
  };

  useEffect((): void => {
    if (fetchHookData) {
      setPokemonTypes(fetchHookData.results);
    }
  }, [fetchHookData]);

  useEffect((): void => {
    if (fetchHookError) {
      callErrorAlert('Pokemons are unavailable on the server');
    }
  }, [fetchHookError]);

  useEffect((): void => {
    setIsChecked(false);
    if (pokemons && filterOption && filterValue) {
      setFilteredPokemons(filterPokemons(filterOption, filterValue, pokemons));
    } else if (pokemons) {
      setFilteredPokemons(pokemons);
    }
  }, [pokemons]);

  useEffect((): void => {
    if (pokemonTypes) {
      callHandleFetch();
    }
  }, [pokemonTypes]);

  useEffect((): void => {
    if (filterValue && filterOption) {
      setFilteredPokemons(filterPokemons(filterOption, filterValue, pokemons));
      setIsChecked(false);
    }
  }, [filterValue]);

  useEffect((): void => {
    if (searchfield && searchfield !== '') {
      setFilterOption(FilterOptions.Name);
      setFilterValue(searchfield);
      setIsDropdownClear(true);
      setIsChecked(false);
    }
  }, [searchfield]);

  useEffect((): void => {
    if (isChecked && pokemons) {
      const caughtPokemons = filterPokemonsByCaught(pokemons);
      setFilteredPokemons(caughtPokemons);
      setSearchfield('');
      setIsDropdownClear(true);
      setFilterValue(null);
    } else {
      setFilteredPokemons(pokemons);
    }
  }, [isChecked]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {(fetchHookLoading || isLoading) && <Loader />}
      <>
        {selectorOptions && pokemonTypes && (
          <>
            <View style={styles.barContainer}>
              <TextInput
                style={styles.searchField}
                onChangeText={setSearchfield}
                value={searchfield}
                placeholder="search pokemon by name"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.barContainer}>
              <Text>Pokemon Types: {currentType.name}</Text>
              <CustomDropdown
                selectorOptions={selectorOptions}
                onSelectItem={(item: string) => {
                  setSearchfield('');
                  setIsDropdownClear(false);
                  setFilterOption(FilterOptions.Type);
                  const chosenType = findPokemonType(pokemonTypes, item);
                  if (chosenType) {
                    // chosenType.name !
                    setFilterValue(chosenType.name);
                  }
                }}
                clearSelect={isDropdownClear}
              />
            </View>
            <View style={styles.checkBoxRow}>
              <CheckBox
                style={{ marginRight: 10 }}
                disabled={false}
                value={isChecked}
                onValueChange={(newValue: boolean) => setIsChecked(newValue)}
                boxType={'square'}
                animationDuration={0}
                onCheckColor={'white'}
                onTintColor={'#72ACFF'}
                onFillColor={'#72ACFF'}
              />
              <Text>Only show caught Pokemons</Text>
            </View>
            <PokemonList
              pokemons={filteredPokemons}
              onCatchButtonPress={handleCatchButtonPress}
              onPokemonItemPress={handlePokemonItemPress}
            />
          </>
        )}
      </>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  barContainer: {
    marginVertical: 10,
    paddingHorizontal: 40,
  },
  searchField: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  checkBoxRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
});
