import React, { useContext } from 'react';
import { ContextoApp } from '../contextos/contextoAppSolo';
import Header from '../componentes/Header';
import BarraPasos from '../componentes/BarraPasos';
import VolverBoton from '../componentes/VolverBoton';
import "../estilos/resumen.scss";

const Resumen = () => {
  const { usuario, planSeleccionado } = useContext(ContextoApp);

 
  const nombreCompleto = [usuario?.name, usuario?.lastName].filter(Boolean).join(' ');
  const nombreAMostrar = nombreCompleto || 'Nombre Apellido';

  const plan = planSeleccionado?.plan || '---';
  const precio = planSeleccionado?.precio || '$-- al mes';

  if (!usuario) {
    
    return null;
  }

  return (
    <>
      <Header />

      <BarraPasos actual={2} />

      <main className="pagina-resumen" aria-label="Resumen del seguro">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <VolverBoton to="/paso-1" className="volver">Volver</VolverBoton>
          <h2 className="titulo-resumen">Resumen del seguro</h2>
        </div>

        <div className="card-resumen">
          <p className="subtitulo">PRECIOS CALCULADOS PARA:</p>
          <p className="nombre" aria-label="Nombre del usuario">👤 {nombreAMostrar}</p>
          <hr />

          <div className="seccion">
            <h4>Responsable de pago</h4>
            <p>DNI: {usuario?.dni || '---'}</p>
            <p>Celular: {usuario?.cell || '---'}</p>
          </div>

          <div className="seccion">
            <h4>Plan elegido</h4>
            <p>{plan}</p>
            <p>Costo del Plan: {precio}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Resumen;