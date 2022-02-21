import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { InventoryItem, Items } from './index';

export interface InventoryState {
  items: Items,
}

const initialState: InventoryState = {
  items: [],
}

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addInventoryItem: (state, action: PayloadAction<InventoryItem>) => {
      const maxId = state.items.reduce((prev, curr) => {
        if (curr.id && curr.id > prev) return curr.id;
        return prev;
      }, 0);
      state.items.push({
        ...action.payload,
        id: maxId + 1,
      });
    },
    setInventoryItems: (state, action: PayloadAction<Items>) => {
      state.items = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addInventoryItem, setInventoryItems } = inventorySlice.actions

export default inventorySlice.reducer
