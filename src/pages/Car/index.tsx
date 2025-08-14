import { memo } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useCar } from "../../api/hooks/useCar";
import type { ICar } from "../../types";
import { useDispatch } from "react-redux";
import { setEditing } from "../../lib/features/editingItem";
import { useNavigate } from "react-router-dom";
import { useGetValuesRedux } from "../../hooks/useGetValues";

const Car = () => {
  const { deleteCar } = useCar();
  const { getCars } = useCar();
  const { data } = getCars();
  const cars = data?.data;

  const { setFormData } = useGetValuesRedux();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUpdate = (car: ICar) => {
    setFormData(car);
    dispatch(setEditing(car));
    navigate("/");
  };

  const handleDelete = (id: number) => {
    deleteCar.mutate(id);
  };
  return (
    <div className="container mt-[50px] grid grid-cols-4 gap-[18px] rounded-md max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
      {cars?.length ? (
        cars?.map((car: ICar) => (
          <div
            key={car.id}
            className="bg-white border border-gray-300 rounded-md shadow-md p-5 flex flex-col gap-[5px]"
          >
            <h1 className="font-semibold">
              #: <span className="text-[#555]">{car.id}</span>
            </h1>
            <p className="font-semibold line-clamp-1">
              Name: <span className="text-[#555]">{car.name}</span>
            </p>
            <p className="font-semibold">
              Price: <span className="text-[#555]">{car.price}</span>
            </p>
            <p className="font-semibold line-clamp-1">
              Brand: <span className="text-[#555]">{car.brand}</span>
            </p>
            <p className="font-semibold line-clamp-1">
              Color: <span className="text-[#555]">{car.color}</span>
            </p>
            <p className="font-semibold line-clamp-1">
              Releasedate:{" "}
              <span className="text-[#555]">{car.release_date}</span>
            </p>
            <p className="font-semibold line-clamp-1">
              Power: <span className="text-[#555]">{car.power}</span>
            </p>
            <div className="flex gap-10 mt-auto">
              <button onClick={() => handleUpdate(car)}>
                <FaEdit className="text-green-600 text-[18px] cursor-pointer hover:opacity-70" />
              </button>
              <button onClick={() => handleDelete(car.id as number)}>
                <FaTrash className="text-red-600 text-[18px] cursor-pointer hover:opacity-70" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center h-64 bg-blue-50 rounded-lg shadow-md">
          <h1 className="text-[24px] text-blue-700 font-semibold text-center">
            Please, create a car first!
          </h1>
        </div>
      )}
    </div>
  );
};

export default memo(Car);
