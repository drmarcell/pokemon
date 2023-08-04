import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PokemonType } from '../helpers/interfaces';
import { firstLetterToUppercase } from '../helpers/common';
import { PrimaryButton } from '../components/PrimaryButton';

interface ListElement {
  elementData: PokemonType;
  onButtonPress: (name: string) => void;
  onPokemonFieldPress: (name: string) => void;
}

export const PokemonListElement = ({
  elementData,
  onButtonPress,
  onPokemonFieldPress,
}: ListElement): JSX.Element => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.textContainer,
          {
            borderWidth: 1,
            borderColor: elementData.caught ? '#FFCB03' : '#2F6EB5',
          },
        ]}
        onPress={(): void => {
          onPokemonFieldPress(elementData.name);
        }}>
        <Text style={styles.text}>
          {firstLetterToUppercase(elementData.name)}
        </Text>
        <Text style={styles.text}>
          {elementData.type && firstLetterToUppercase(elementData.type)}
        </Text>
        <Text style={[styles.text, styles.lastText]}>
          {elementData.caught ? 'Caught' : '-'}
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          pokemon={elementData}
          isCaught={elementData.caught ? elementData.caught : false}
          onButtonPress={onButtonPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    minHeight: 40,
    marginVertical: 8,
    width: '75%',
    borderRadius: 8,
  },
  text: {
    width: '33%',
    paddingLeft: 15,
  },
  lastText: {
    textAlign: 'left',
  },
  buttonContainer: {
    width: '25%',
    paddingHorizontal: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 40,
    marginVertical: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
  },
});
