import React, { memo } from "react";
import { useCar } from "../../api/hooks/useCar";
import type { ICar } from "../../types";
import { useNavigate } from "react-router-dom";
import { setEditing } from "../../lib/features/editingItem";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../lib";
import { useGetValuesRedux } from "../../hooks/useGetValues";
import { initialState } from "../../lib/features/cartSlice";

const Home = () => {
  const { createCar, updateCar } = useCar();
  const { formData, handleChange, setFormData } = useGetValuesRedux();
  const navigate = useNavigate();
  const editing = useSelector((state: RootState) => state.editingSlice.editing);
  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editing) {
      const trimmedFormData = {
        ...formData,
        name: formData.name.trim(),
        price: String(formData.price).trim(),
        brand: formData.brand.trim(),
        color: formData.color.trim(),
        release_date: formData.release_date.trim(),
        power: String(formData.power).trim(),
      };

      if (
        trimmedFormData.name &&
        trimmedFormData.price &&
        trimmedFormData.brand &&
        trimmedFormData.color &&
        trimmedFormData.release_date &&
        trimmedFormData.power
      ) {
        const updatedUser: ICar = {
          name: formData.name,
          price: Number(formData.price),
          brand: formData.brand,
          color: formData.color,
          release_date: formData.release_date,
          power: Number(formData.power),
        };
        updateCar.mutate(
          { id: editing.id as number, data: updatedUser },
          {
            onSuccess: () => {
              setFormData(initialState);
              dispatch(setEditing(null));
              navigate("/car");
            },
          }
        );
      }
    } else {
      if (formData) {
        let { name, brand, color, release_date, price, power } = formData;

        name = name.trim();
        price = (price as string).trim();
        brand = brand.trim();
        color = color.trim();
        release_date = release_date.trim();
        power = (power as string).trim();
        if (
          !name ||
          !brand ||
          !color ||
          !release_date ||
          isNaN(Number(price)) ||
          isNaN(Number(power))
        ) {
          alert("Please fill in all required fields correctly.");
          return;
        }

        const newCar: ICar = {
          name,
          brand,
          color,
          release_date,
          price: Number(price),
          power: Number(power),
        };
        createCar.mutate(newCar, {
          onSuccess: () => {
            setFormData(initialState);
            navigate("/car");
          },
        });
      }
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="size-140 bg-white rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)] ">
        <h1 className="font-medium text-2xl text-center pt-[30px] text-[black]">
          {editing ? "Update car" : "Create car"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-[15px] pt-[30px]"
        >
          <input
            name="name"
            value={formData?.name}
            onChange={handleChange}
            type="text"
            className="w-[75%] h-[47px] px-[15px] outline-none rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] focus:shadow-[0_6px_16px_rgba(0,0,0,0.2)] transition-shadow duration-300"
            placeholder="Enter name..."
            required
          />
          <input
            name="price"
            value={formData?.price}
            onChange={handleChange}
            type="number"
            className="w-[75%] h-[47px] px-[15px] outline-none rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] focus:shadow-[0_6px_16px_rgba(0,0,0,0.2)] transition-shadow duration-300"
            placeholder="Enter price..."
            required
          />
          <input
            name="brand"
            value={formData?.brand}
            onChange={handleChange}
            type="text"
            className="w-[75%] h-[47px] px-[15px] outline-none rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] focus:shadow-[0_6px_16px_rgba(0,0,0,0.2)] transition-shadow duration-300"
            placeholder="Enter brand..."
            required
          />
          <input
            name="color"
            value={formData?.color}
            onChange={handleChange}
            type="text"
            className="w-[75%] h-[47px] px-[15px] outline-none rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] focus:shadow-[0_6px_16px_rgba(0,0,0,0.2)] transition-shadow duration-300"
            placeholder="Enter color..."
            required
          />

          <input
            name="release_date"
            value={formData?.release_date}
            onChange={handleChange}
            type="date"
            className="w-[75%] h-[47px] px-[15px] outline-none rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] focus:shadow-[0_6px_16px_rgba(0,0,0,0.2)] transition-shadow duration-300"
            placeholder="Enter release date..."
            required
          />

          <input
            name="power"
            value={formData?.power}
            onChange={handleChange}
            type="number"
            className="w-[75%] h-[47px] px-[15px] outline-none rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] focus:shadow-[0_6px_16px_rgba(0,0,0,0.2)] transition-shadow duration-300"
            placeholder="Enter power..."
            required
          />
          <button
            disabled={createCar.isPending}
            className="border w-[75%] h-[40px] mt-[5px] text-[white] bg-[#4070F4] cursor-pointer hover:opacity-85"
          >
            {createCar.isPending ? "Loading" : editing ? "Save" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(Home);
