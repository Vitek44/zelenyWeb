import { createContext, useContext, useState } from "react";

const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
  const [shape, setShape] = useState(1);
  const [edge, setEdge] = useState(1);
  const [legs, setLegs] = useState(1);
  const [material, setMaterial] = useState("wood1");
  const [legColor, setLegColor] = useState("#8B4513");
  return (
    <CustomizationContext.Provider
      value={{
        shape,
        setShape,
        edge,
        setEdge,
        legs,
        setLegs,
        material,
        setMaterial,
        legColor,
        setLegColor,
      }}
    >
      {props.children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  return context;
};
