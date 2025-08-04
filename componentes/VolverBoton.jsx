import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/botonvolver.scss';

const VolverBoton = ({ to, children = 'Volver', className = '', ...props }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    if (to) navigate(to);
    else navigate(-1);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`volver-btn ${className}`.trim()}
      {...props}
      aria-label={typeof children === 'string' ? children : 'Volver'}
    >
      <span className="icon" aria-hidden="true">←</span>
      <span className="text">{children}</span>
    </button>
  );
};

export default VolverBoton;
