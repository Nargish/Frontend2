import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./paginas/Inicio";
import PasoUno from "./paginas/PasoUno";
import Resumen from "./paginas/Resumen";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/paso-1" element={<PasoUno />} />
        <Route path="/resumen" element={<Resumen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App