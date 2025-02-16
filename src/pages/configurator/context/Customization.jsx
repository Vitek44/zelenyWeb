import { createContext, useContext, useState } from "react";

const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
  const [shape, setShape] = useState(1);
  return (
    <CustomizationContext.Provider
      value={{
        shape,
        setShape,
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
