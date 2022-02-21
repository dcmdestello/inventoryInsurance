import { useSelector, useDispatch } from 'react-redux';
import { addInventoryItem } from './reduxSlice';
import { useToast } from "react-native-toast-notifications";

import type { ImageInfo } from '../sdk/ImagePicker';
import type { RootState } from '../store';

export type InventoryItem = {
  id?: number;
  name: string;
  value: number;
  type?: string;
  description?: string;
  photo?: string;
};
export type Items = InventoryItem[];
type CheckItemCanBeAdded = (inventoryItems: Items, item: InventoryItem) => boolean;

const INVENTORY_VALUE_CAP = 40000;

export const checkItemCanBeAdded: CheckItemCanBeAdded = (inventoryItems, item) => {
  const totalValue = inventoryItems.reduce((prev, curr) => {
    return prev + curr.value;
  }, 0);

  if (totalValue + item.value > INVENTORY_VALUE_CAP) return false;
  return true;
}

export function useAddInventoryItem(name:string, value:string, photo:ImageInfo|null, description:string) {
  const inventoryItems = useSelector((state: RootState) => state.inventory.items);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleAddItem = (callback: () => void) => {
    if (!name) {
      const toastMessage = "Please fill the name of the item.";
      toast.show(toastMessage, {
        type: "warning",
      });
      return;
    }
    const intValue = parseInt(value, 10);
    if (isNaN(intValue)) {
      const toastMessage = "Please enter the value of the item.";
      toast.show(toastMessage, {
        type: "warning",
      });
      return;
    }
    if (!photo) {
      const toastMessage = "Please add a photo of the item.";
      toast.show(toastMessage, {
        type: "warning",
      });
      return;
    }
    const item: InventoryItem = {
      name,
      photo: photo.uri,
      value: intValue,
      description,
    };
    if (checkItemCanBeAdded(inventoryItems, item)) {
        dispatch(addInventoryItem(item));
        if (callback) callback();
    } else {
      const toastMessage = "Could not add item because the total value of the inventory would surpass 40.000 €";
      toast.show(toastMessage, {
         type: "danger",
      });
    }
  }
  return handleAddItem;
}
