import React from 'react';
import '../estilos/barrapasos.scss';

const pasos = ['Planes y coberturas', 'Resumen'];

const BarraPasos = ({ actual }) => {
  return (
    <div className="barra-pasos">
      {pasos.map((label, idx) => {
        const paso = idx + 1;
        const activo = paso === actual;
        const clasePaso = activo ? 'paso activo' : 'paso inactivo';
        const claseTexto = activo ? 'texto-paso activo' : 'texto-paso inactivo';

        return (
          <React.Fragment key={paso}>
            <div className={clasePaso}>{paso}</div>
            <span className={claseTexto}>{label}</span>
            {paso < pasos.length && <span className="separador">···</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default BarraPasos;
