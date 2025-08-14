import { memo } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Car from "./Car";

const MainRouters = () => {
  return (
    <>
      {useRoutes([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "car",
              element: <Car />,
            },
          ],
        },
      ])}
    </>
  );
};

export default memo(MainRouters);
