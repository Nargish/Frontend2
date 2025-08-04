import React from 'react';
import logoheader from '../png/rimaclogo.png';
import '../estilos/header.scss';

const Header = () => {
  return (
    <header className="encabezado">
      <img src={logoheader} alt="Rimac Logo" className="logo" />
      <div className="info-contacto">
        <span className="texto-venta">¡Compra por este medio!</span>
        <span className="telefono" aria-label="Teléfono de contacto">
          📞 <strong>(01) 411 6001</strong>
        </span>
      </div>
    </header>
  );
};

export default Header;
