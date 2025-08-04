import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ContextoApp } from "../contextos/contextoAppSolo";
import parami from "../png/parami.png";
import alguienmas from "../png/alquienmas.png";
import Header from "../componentes/Header";
import BarraPasos from "../componentes/BarraPasos";
import VolverBoton from "../componentes/VolverBoton";
import "../estilos/pasouno.scss";
import iconCasa from "../png/iconocasa.png";
import iconClinica from "../png/iconohospital.png";

function PasoUno() {
  const { usuario, setUsuario, setPlanSeleccionado } = useContext(ContextoApp);
  const [cargando, setCargando] = useState(true);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navegar = useNavigate();
  const planesRef = useRef(null);
  const isProgrammaticRef = useRef(false);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const respuesta = await fetch(
          "https://rimac-front-end-challenge.netlify.app/api/user.json"
        );
        const data = await respuesta.json();
        setUsuario((prev) => ({ ...prev, name: data.name, lastName: data.lastName }));
        setCargando(false);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
        setCargando(false);
      }
    };

    if (!usuario?.name) {
      obtenerUsuario();
    } else {
      setCargando(false);
    }
  }, [usuario, setUsuario]);

  const seleccionarPlan = (titulo, precio) => {
    setPlanSeleccionado({ plan: titulo, precio });
    navegar("/resumen");
  };

  const seleccionarTipo = (tipo) => {
    setTipoSeleccionado(tipo);
  };

  const manejarKey = (e, tipo) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      seleccionarTipo(tipo);
    }
  };

  const planesParaMi = [
    {
      titulo: "Plan en Casa",
      precio: "$39 al mes",
      detalles: [
        <>
          <strong>Médico general a domicilio </strong>por S/20 y medicinas cubiertas al
          100%
        </>,
        <>
          <strong>Videoconsulta</strong> y orientación al 100%
        </>,
        <>
          <strong>Indemnización</strong> de S/300 en caso de hospitalización por más de
          un día.
        </>,
      ],
      icon: iconCasa,
      recomendado: false,
    },
    {
      titulo: "Plan en Casa y Clínica",
      precio: "$99 al mes",
      detalles: [
        <>
          <strong>Consultas en clínica</strong> para cualquier especialidad.
        </>,
        <>
          <strong>Medicinas y exámenes</strong> derivados cubiertos al 80%
        </>,
        <>
          Atención médica en <strong>más de 200 clínicas del país.</strong>
        </>,
      ],
      icon: iconClinica,
      recomendado: true,
    },
    {
      titulo: "Plan en Casa + Chequeo",
      precio: "$49 al mes",
      detalles: [
        <>
          <strong>Un chequeo preventivo general</strong> de manera presencial o virtual.
        </>,
        <>
          Acceso a <strong>vacunas</strong> en el Programa del MINSA en centros privados.
        </>,
        <>
          <strong>Incluye todos los beneficios del Plan en Casa</strong>.
        </>,
      ],
      icon: iconCasa,
      recomendado: false,
    },
  ];

  const planesParaOtro = [
    {
      titulo: "Plan en Casa",
      precio: "$37.05 al mes",
      detalles: [
        <>
          <strong>Médico general a domicilio </strong>por S/20 y medicinas cubiertas al
          100%
        </>,
        <>
          <strong>Videoconsulta</strong> y orientación al 100%
        </>,
        <>
          <strong>Indemnización</strong> de S/300 en caso de hospitalización por más de
          un día.
        </>,
      ],
      icon: iconCasa,
      recomendado: false,
    },
    {
      titulo: "Plan en Casa y Clínica",
      precio: "$94.05 al mes",
      detalles: [
        <>
          <strong>Consultas en clínica</strong> para cualquier especialidad.
        </>,
        <>
          <strong>Medicinas y exámenes</strong> derivados cubiertos al 80%
        </>,
        <>
          Atención médica en <strong>más de 200 clínicas del país.</strong>
        </>,
      ],
      icon: iconClinica,
      recomendado: true,
    },
    {
      titulo: "Plan en Casa + Chequeo",
      precio: "$46.55 al mes",
      detalles: [
        <>
          <strong>Un chequeo preventivo general</strong> de manera presencial o virtual.
        </>,
        <>
          Acceso a <strong>vacunas</strong> en el Programa del MINSA en centros privados.
        </>,
        <>
          <strong>Incluye todos los beneficios del Plan en Casa</strong>.
        </>,
      ],
      icon: iconCasa,
      recomendado: false,
    },
  ];

  const displayedPlans =
    tipoSeleccionado === "mio"
      ? planesParaMi
      : tipoSeleccionado === "otro"
      ? planesParaOtro
      : [];

  const total = displayedPlans.length;

  
  const scrollToIndex = (index) => {
    const container = planesRef.current;
    if (!container) return;
    const card = container.children[index];
    if (!card) return;
    const offset = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
    isProgrammaticRef.current = true;
    container.scrollTo({ left: offset, behavior: "smooth" });
    setTimeout(() => {
      isProgrammaticRef.current = false;
    }, 350);
  };

  
  useEffect(() => {
    if (!tipoSeleccionado) return;
    setCurrentIndex(0);
    scrollToIndex(0);
  }, [tipoSeleccionado]);


  useEffect(() => {
    const el = planesRef.current;
    if (!el) return;
    const onScroll = () => {
      if (isProgrammaticRef.current) return;
      const children = Array.from(el.children);
      const scrollLeft = el.scrollLeft;
      const containerCenter = scrollLeft + el.clientWidth / 2;
      let bestIndex = 0;
      let minDiff = Infinity;
      children.forEach((child, idx) => {
        const childCenter = child.offsetLeft + child.clientWidth / 2;
        const diff = Math.abs(containerCenter - childCenter);
        if (diff < minDiff) {
          minDiff = diff;
          bestIndex = idx;
        }
      });
      setCurrentIndex(bestIndex);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [tipoSeleccionado]);

  const next = () => {
    if (currentIndex < total - 1) {
      const ni = currentIndex + 1;
      setCurrentIndex(ni);
      scrollToIndex(ni);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      const ni = currentIndex - 1;
      setCurrentIndex(ni);
      scrollToIndex(ni);
    }
  };

  if (cargando || !usuario) return null;

  return (
    <>
      <div className="inicio-pagina">
        <Header />
        <BarraPasos actual={1} />
        <div className="paso-uno">
          <div className="volver-wrapper">
            <VolverBoton to="/">Volver</VolverBoton>
          </div>
          <h1>{usuario.name}, ¿para quién deseas cotizar?</h1>
          <p>Selecciona la opción que se ajuste más a tus necesidades.</p>

          <div className="opciones">
            <div
              className={`tarjeta ${tipoSeleccionado === "mio" ? "seleccionada" : ""}`}
              onClick={() => seleccionarTipo("mio")}
              onKeyDown={(e) => manejarKey(e, "mio")}
              role="button"
              tabIndex={0}
              aria-pressed={tipoSeleccionado === "mio"}
            >
              <div className="radio-wrapper">
                <input
                  type="radio"
                  name="tipo"
                  checked={tipoSeleccionado === "mio"}
                  readOnly
                  aria-label="Seleccionar Para mí"
                />
                <div className="fake-circle" />
              </div>
              <img src={parami} alt="Para mí" />
              <h3>Para mí</h3>
              <p>Cotiza tu seguro de salud y agrega familiares si así lo deseas.</p>
            </div>

            <div
              className={`tarjeta ${tipoSeleccionado === "otro" ? "seleccionada" : ""}`}
              onClick={() => seleccionarTipo("otro")}
              onKeyDown={(e) => manejarKey(e, "otro")}
              role="button"
              tabIndex={0}
              aria-pressed={tipoSeleccionado === "otro"}
            >
              <div className="radio-wrapper">
                <input
                  type="radio"
                  name="tipo"
                  checked={tipoSeleccionado === "otro"}
                  readOnly
                  aria-label="Seleccionar Para alguien más"
                />
                <div className="fake-circle" />
              </div>
              <img src={alguienmas} alt="Para alguien más" />
              <h3>Para alguien más</h3>
              <p>Realiza una cotización para alguien diferente a ti.</p>
            </div>
          </div>

          {tipoSeleccionado && (
            <div className="planes-wrapper">
              <div className="planes" ref={planesRef}>
                {displayedPlans.map(({ titulo, precio, detalles, icon, recomendado }) => (
                  <ComponentePlan
                    key={titulo}
                    titulo={titulo}
                    precio={precio}
                    detalles={detalles}
                    recomendado={recomendado}
                    icon={icon}
                    onSeleccionar={seleccionarPlan}
                  />
                ))}
              </div>
              <div className="carousel-controls">
                <button onClick={prev} aria-label="Anterior" disabled={currentIndex === 0} className="arrow left">
                  ←
                </button>
                <span className="counter">{total > 0 ? currentIndex + 1 : 0} / {total}</span>
                <button
                  onClick={next}
                  aria-label="Siguiente"
                  disabled={currentIndex === total - 1}
                  className="arrow right"
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ComponentePlan({ titulo, precio, detalles, recomendado, onSeleccionar, icon }) {
  return (
    <div className="tarjeta-plan">
      {recomendado && <span className="badge-recomendado">Plan recomendado</span>}

      <div className="header">
        <div className="titulo-wrapper">
          <h4>{titulo}</h4>
          <div className="subtitulo-plan">COSTO DEL PLAN</div>
          <div className="precio">{precio}</div>
        </div>
        {icon && (
          <div className="icono-plan">
            <img src={icon} alt={`${titulo} icono`} aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="divisor" />

      <ul className="detalles">
        {detalles.map((linea, i) => (
          <li key={i}>{linea}</li>
        ))}
      </ul>

      <button onClick={() => onSeleccionar(titulo, precio)} aria-label={`Seleccionar ${titulo}`}>
        Seleccionar Plan
      </button>
    </div>
  );
}

export default PasoUno;