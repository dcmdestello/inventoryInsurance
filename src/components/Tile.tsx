import type { ReactNode } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import type { ViewStyle } from 'react-native';

type TileProps = {
  numColumns?: number,
  height?: number,
  children: ReactNode,
};

export default function Tile({ children, height = 300, numColumns = 1 }: TileProps) {
  let rootStyle: ViewStyle = {
    height,
  };
  if (numColumns > 1) rootStyle.flex = 1/numColumns;
  return (
    <View style={rootStyle}>
      <View style={styles.tile}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgb(99, 87, 54)',
    borderRadius: 10,
    margin: 20,
    backgroundColor: 'white',
    overflow: 'hidden',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
