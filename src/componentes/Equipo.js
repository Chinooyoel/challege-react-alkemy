import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import alertaContext from '../context/alerta/alertaContext';
import superheroesContext from '../context/superheroes/superheroesContext';


const Equipo = () => {

    const { equipo, eliminarSuperheroeDelEquipo } = useContext(superheroesContext);
    const { mostrarAlerta } = useContext(alertaContext);

    const expulsarSuperheroe = async id => {
        eliminarSuperheroeDelEquipo(id);
        mostrarAlerta("Se ha expulsado correctamente del equipo")
    }

    return ( 
        <section className="d-flex flex-wrap justify-content-center">
        <h1 className='text-center w-100'>Miembros del equipo</h1>
        {equipo.length === 0 ? (
          <div className="text-center w-100">
            No hay miembros en el equipo
          </div>
        ) 
        : 
        (
          equipo.map((superheroe) => (
            <div className="card superheroe p-3 shadow" key={superheroe.id}>
              <img
                src={superheroe.image.url}
                className="card-img-top"
                alt={superheroe.name}
              />
              <div className="card-body text-center">
                <h3>{superheroe.name}</h3>
                <div className='row'>
                  <div className='col-6 col-sm-12'>
                      <p className='my-0'><strong>Inteligencia:</strong> {superheroe.powerstats.intelligence}</p>
                      <p className='my-0'><strong>Fuerza:</strong> {superheroe.powerstats.strength}</p>
                      <p className='my-0'><strong>Velocidad:</strong> {superheroe.powerstats.speed}</p>
                  </div>
                  <div className='col-6 col-sm-12'>
                      <p className='my-0'><strong>Poder:</strong> {superheroe.powerstats.power}</p>
                      <p className='my-0'><strong>Resistencia:</strong> {superheroe.powerstats.durability}</p>
                      <p className='my-0'><strong>Combate:</strong> {superheroe.powerstats.combat}</p>
                  </div>
                </div>
              </div>
              <div className='text-center'>
                <Link 
                  to={`/superheroe/perfil/${superheroe.id}`}
                  className="btn btn-dark mx-1 mb-2"
                >
                  Ver detalle
                </Link>
                <button
                  className="btn btn-danger mx-1 mb-2"
                  onClick={() => expulsarSuperheroe(superheroe)}
                >
                  Expulsar
                </button>
              </div>
            </div>
          ))
        )}
      </section>
     );
}
 
export default Equipo;