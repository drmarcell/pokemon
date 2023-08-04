import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { PokemonType } from '../helpers/interfaces';
import { PokemonListElement } from './PokemonListElement';

interface PokemonListType {
  pokemons: Array<PokemonType>;
  onCatchButtonPress: (pokemonName: string) => void;
  onPokemonItemPress: (pokemonName: string) => void;
}

interface PokemonItemType {
  pokemonElement: PokemonType;
  onItemButtonPress: (pokemonName: string) => void;
  onPokemonFieldPress: (pokemonName: string) => void;
}

const Item = ({
  pokemonElement,
  onItemButtonPress,
  onPokemonFieldPress,
}: PokemonItemType) => (
  <PokemonListElement
    elementData={pokemonElement}
    onButtonPress={(name: string): void => {
      if (name) {
        onItemButtonPress(name);
      }
    }}
    onPokemonFieldPress={(name: string): void => {
      if (name) {
        onPokemonFieldPress(name);
      }
    }}
  />
);

export const PokemonList = ({
  pokemons,
  onCatchButtonPress,
  onPokemonItemPress,
}: PokemonListType): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Type</Text>
        <Text style={styles.headerText}>Status</Text>
        <Text style={styles.headerText} />
      </View>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        initialNumToRender={40}
        data={pokemons}
        renderItem={({ item }) => (
          <Item
            pokemonElement={item}
            onItemButtonPress={onCatchButtonPress}
            onPokemonFieldPress={onPokemonItemPress}
          />
        )}
        keyExtractor={(item, index) => `${item.name}-${index}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CDDEEE',
    flex: 1,
  },
  headerTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 0,
    backgroundColor: '#CDDEEE',
    paddingHorizontal: 20,
  },
  headerText: {
    width: '25%',
    paddingLeft: 25,
    fontWeight: 'bold',
    paddingVertical: 15,
  },
});
