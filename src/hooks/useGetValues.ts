import { useDispatch, useSelector } from "react-redux";
import type { ICar } from "../types";
import type { AppDispatch, RootState } from "../lib";
import { setFormData, updateField } from "../lib/features/cartSlice";



export const useGetValuesRedux = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.carSlice.formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateField({ name, value }));
  };

  const setFormDataDirect = (data: ICar) => {
    dispatch(setFormData(data));
  };

  return { 
    formData, handleChange, setFormData: setFormDataDirect };
};
