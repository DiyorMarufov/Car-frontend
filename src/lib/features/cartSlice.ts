import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ICar } from "../../types";

export const initialState: ICar = {
  name: "",
  brand: "",
  color: "",
  release_date: "",
  price: "",
  power: "",
};

interface CarState {
  formData: ICar;
}

const initialCarState: CarState = {
  formData: initialState,
};

const carSlice = createSlice({
  name: "car",
  initialState: initialCarState,
  reducers: {
    setFormData: (state, action: PayloadAction<ICar>) => {
      state.formData = action.payload;
    },
    updateField: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      const { name, value } = action.payload;
      (state.formData as any)[name] = value;
    },
    resetForm: (state) => {
      state.formData = initialState;
    },
  },
});

export const { setFormData, updateField, resetForm } = carSlice.actions;
export default carSlice.reducer;
