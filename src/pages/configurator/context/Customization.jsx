import { createContext, useContext, useState } from "react";

const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
  const [shape, setShape] = useState(1);
  const [edge, setEdge] = useState(1);
  const [legs, setLegs] = useState(1);
  const [material, setMaterial] = useState("wood1");
  const [legColor, setLegColor] = useState("leg2");
  const [delka, setDelka] = useState(80);
  const [sirka, setSirka] = useState(160);
  const [vyska, setVyska] = useState(70);
  const [tloustka, setTloustka] = useState(30); // Tloušťka desky
  const [epoxid, setEpoxid] = useState(1); // Epoxidová pryskyřice

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
        delka,
        setDelka,
        sirka,
        setSirka,
        vyska,
        setVyska,
        tloustka,
        setTloustka,
        epoxid,
        setEpoxid,
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
