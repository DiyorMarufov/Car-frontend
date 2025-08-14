import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICar } from "../../types";

export interface IEditing {
  editing: ICar | null;
}

const initialState: IEditing = {
  editing: null,
};

export const editingSlice = createSlice({
  name: "reload",
  initialState,
  reducers: {
    setEditing: (state, actions: PayloadAction<ICar | null>) => {
      state.editing = actions.payload;
    },
  },
});

export const { setEditing } = editingSlice.actions;
export default editingSlice.reducer;
