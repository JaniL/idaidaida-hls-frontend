import React, { useContext } from "react";
import { HelloData } from "./api/hello";

const StationDataContext = React.createContext<HelloData | null>(null);

export const useStationDataContext = () => {
  return useContext(StationDataContext);
};

export default StationDataContext;
