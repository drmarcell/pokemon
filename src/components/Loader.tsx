import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

export const Loader = (): JSX.Element => {
  const { height, width } = useWindowDimensions();

  return (
    <View style={[styles.container, styles.horizontal, { height, width }]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 150,
    zIndex: 10,
    opacity: 0.5,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
