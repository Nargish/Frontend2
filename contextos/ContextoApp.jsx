import { useState } from "react";
import { ContextoApp } from "./contextoAppSolo";

export const ProveedorApp = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);

  return (
    <ContextoApp.Provider value={{ usuario, setUsuario, planSeleccionado, setPlanSeleccionado }}>
      {children}
    </ContextoApp.Provider>
  );
};
