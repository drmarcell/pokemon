import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PokemonType, PokemonFeatures } from '../helpers/interfaces';

interface Button {
  pokemon: PokemonType | PokemonFeatures;
  onButtonPress: (pokemonName: string) => void;
  isCaught: boolean;
}

export const PrimaryButton = ({
  pokemon,
  onButtonPress,
  isCaught,
}: Button): JSX.Element => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: isCaught ? '#FFCB03' : '#2F6EB5',
        },
      ]}
      activeOpacity={0.8}
      onPress={(): void => {
        onButtonPress(pokemon.name);
      }}>
      <Text style={styles.buttonText}>{isCaught ? 'Release' : 'Catch'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 10,
    minHeight: 40,
  },
  buttonText: {
    color: 'white',
  },
});
