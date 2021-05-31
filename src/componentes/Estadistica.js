import React, { useContext } from "react";
import superheroesContext from "../context/superheroes/superheroesContext";

const Estadistica = () => {
  const { estadisticas, estadisticaMaxima } = useContext(superheroesContext);

  return (
    <article className="border rounded-3 p-3 my-3">
      <section className="d-flex flex-column flex-md-row justify-content-between mb-3">
        <h3 className="mb-3 text-center">Estadisticas del equipo</h3>
        <h3 className="text-center"> Tipo de equipo: <span className="text-capitalize">{estadisticaMaxima}</span> </h3>
      </section>

      <section className="row">

        <div className="col-12 col-sm-6 col-md-4">
          <div className="d-flex align-items-center mb-2">
            <img src="/inteligencia.png" className="icono me-2" alt='icono'/>
            <p className="my-0">
              <strong>Inteligencia:</strong> {estadisticas.inteligencia}
            </p>
          </div>
          <div className="d-flex align-items-center mb-2">
            <img src="/fuerza.png" className="icono me-2" alt='icono'/>
            <p className="my-0">
              <strong>Fuerza:</strong> {estadisticas.fuerza}
            </p>
          </div>
          <div className="d-flex align-items-center mb-2">
            <img src="/velocidad.png" className="icono me-2" alt='icono'/>
            <p className="my-0">
              <strong>Velocidad:</strong> {estadisticas.velocidad}
            </p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-4">
          <div className="d-flex align-items-center mb-2">
            <img src="/poder.png" className="icono me-2" alt='icono'/>
            <p className="my-0">
              <strong>Poder:</strong> {estadisticas.poder}
            </p>
          </div>
          <div className="d-flex align-items-center mb-2">
            <img src="/durabilidad.png" className="icono me-2" alt='icono'/>
            <p className="my-0">
              <strong>Durabilidad:</strong> {estadisticas.durabilidad}
            </p>
          </div>
          <div className="d-flex align-items-center mb-2">
            <img src="/combate.png" className="icono me-2" alt='icono'/>
            <p className="my-0">
              <strong>Combate:</strong> {estadisticas.combate}
            </p>
          </div>
        </div>
        
        <div className="col-12 col-md-4">
          <div className="d-flex align-items-center mb-2">
            <img src="/altura.png" className="icono me-2" alt='icono'/>
            <p className="my-0">
              <strong>Altura promedio del equipo:</strong>{" "}
              {estadisticas.alturaPromedio} cms
            </p>
          </div>
          <div className="d-flex align-items-center mb-2">
            <img src="/peso.png" className="icono me-2" alt='icono'/>
            <p className="my-0">
              <strong>Peso promedio del equipo:</strong>{" "}
              {estadisticas.pesoPromedio} kgs
            </p>
          </div>
        </div>
      </section>
    </article>
  );
};

export default Estadistica;
