import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Header from "../componentes/Header";
import abrazo from "../png/abrazo.png";
import logofooter from "../png/rimaclogoblanco.png";
import blurIzquierdo from "../png/blur-asset1.png";
import blurDerecho from "../png/blur-asset2.png";
import "../estilos/principal.scss";
import { ContextoApp } from "../contextos/contextoAppSolo";

function Inicio() {
  const navegar = useNavigate();
  const { usuario, setUsuario } = useContext(ContextoApp);

  const [tipoDoc, setTipoDoc] = useState("DNI");
  const [dni, setDni] = useState("");
  const [celular, setCelular] = useState("");
  const [aceptaPolitica, setAceptaPolitica] = useState(false);
  const [aceptaComercial, setAceptaComercial] = useState(false);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const respuesta = await fetch("https://rimac-front-end-challenge.netlify.app/api/user.json");
        const data = await respuesta.json();
        setUsuario(prev => ({ ...data, dni: prev?.dni || "", cell: prev?.cell || "" }));
      } catch (e) {
        console.error("Error al cargar usuario:", e);
      }
    };

    if (!usuario) {
      obtenerUsuario();
    }
  }, [usuario, setUsuario]);

  const manejarCotizar = () => {
    setUsuario(prev => ({
      ...prev,
      dni,
      cell: celular,
    }));
    navegar("/paso-1");
  };

  const botonActivo =
    dni.length === 8 &&
    celular.length === 9 &&
    aceptaPolitica &&
    aceptaComercial;

  return (
    <div className="inicio-pagina">
      <Header />

      <main className="contenido">
        <img src={blurIzquierdo} className="blur-left" alt="" />
        <img src={blurDerecho} className="blur-right" alt="" />

        <div className="columna-imagen">
          <img src={abrazo} alt="Familia feliz" className="imagen-principal" />
        </div>

        <div className="columna-formulario">
          <div className="header-row">
            <div className="texto-titulo">
              <div className="etiqueta-plan">Seguro Salud Flexible</div>
              <h1>Creado para ti y tu <br /> familia</h1>
              <p>
                Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.
              </p>
            </div>
            <div className="imagen-chica-wrapper">
              <img src={abrazo} alt="Familia feliz" className="imagen-chica" />
            </div>
          </div>

          <form className="formulario-inicio">
            <div className="grupo-input">
              <select value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)}>
                <option>DNI</option>
                <option>CE</option>
              </select>

              <div className="input-floating">
                <input
                  type="text"
                  placeholder=" "
                  value={dni}
                  onChange={(e) => {
                    const valor = e.target.value;
                    if (/^\d{0,8}$/.test(valor)) setDni(valor);
                  }}
                />
                <label>Nro. de {tipoDoc}</label>
              </div>
            </div>

            <div className="input-floating">
              <input
                type="text"
                placeholder=" "
                value={celular}
                onChange={(e) => {
                  const valor = e.target.value;
                  if (/^\d{0,9}$/.test(valor)) setCelular(valor);
                }}
              />
              <label>Celular</label>
            </div>

            <label>
              <input
                type="checkbox"
                checked={aceptaPolitica}
                onChange={(e) => setAceptaPolitica(e.target.checked)}
              />
              Acepto la Política de Privacidad
            </label>

            <label>
              <input
                type="checkbox"
                checked={aceptaComercial}
                onChange={(e) => setAceptaComercial(e.target.checked)}
              />
              Acepto la Política Comunicaciones Comerciales
            </label>

            <a href="#">Aplican Términos y Condiciones.</a>

            <button
              type="button"
              onClick={manejarCotizar}
              disabled={!botonActivo}
            >
              Cotiza aquí
            </button>
          </form>
        </div>
      </main>

      <footer className="pie">
        <div className="pie-contenido">
          <img src={logofooter} alt="Logo Footer" className="logo-footer" />
          <p>© 2023 RIMAC Seguros y Reaseguros.</p>
        </div>
      </footer>
    </div>
  );
}

export default Inicio;