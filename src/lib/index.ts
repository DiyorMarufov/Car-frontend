import { configureStore } from "@reduxjs/toolkit";
import editingSlice from "./features/editingItem";
import carSlice from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    editingSlice,
    carSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
