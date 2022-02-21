import { View, Text, Image, StyleSheet } from 'react-native';
import { InventoryItem } from '../inventory';

import Tile from './Tile';

type PropsT = {
  item: InventoryItem,
  numColumns?: number,
};

export default function IventoryTile({ item, numColumns = 2 }: PropsT) {
  const { value } = item;
  return (
    <Tile height={300} numColumns={numColumns}>
      <Image style={styles.image} source={{uri: item.photo}} />
      <View style={styles.info}>
        <Text style={styles.itemName}
        numberOfLines={2}
        ellipsizeMode="clip"
        >
        {item.name}
        </Text>
        <Text style={styles.itemValue}>{'€ ' + value}</Text>
      </View>
    </Tile>
  );
}


const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  info: {
    height: 90,
    padding: 10,
    justifyContent: 'space-between',
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemValue: {
    color: 'grey',
  }
});
