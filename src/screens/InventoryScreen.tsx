import { useEffect } from 'react';
import { StyleSheet, View, FlatList } from "react-native";
import { Title } from "../components/Title";
import { RootTabScreenProps } from "../navigation/types";
import { colors } from "../theme/colors";
import InventoryTile from '../components/InventoryTile';

import { useSelector, useDispatch } from 'react-redux'
import { setInventoryItems } from '../inventory/reduxSlice';
import { fetchItems } from '../network';

import type { RootState } from '../store';

export default function InventoryScreen({
  navigation,
  route
}: RootTabScreenProps<"Inventory">) {

  const inventoryItems = useSelector((state: RootState) => state.inventory.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchItems();
      dispatch(setInventoryItems(data));
    }
    fetch();
  }, [])

  const handleAddButtonPress = () => navigation.navigate("AddItem");

	const numColumns = 2;
  return (
    <View style={styles.container}>
      <Title onButtonPress={handleAddButtonPress}>{route.name}</Title>
        <FlatList
	        data={inventoryItems}
					renderItem={(props) => <InventoryTile {...props} numColumns={numColumns} />}
	        keyExtractor={(item) => "" +item.id}
					numColumns={numColumns}
				/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  }
});
