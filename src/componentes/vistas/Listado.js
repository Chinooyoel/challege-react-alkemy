import React, { Fragment, useContext } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import alertaContext from "../../context/alerta/alertaContext";
import superheroesContext from "../../context/superheroes/superheroesContext";
import Alerta from "../layout/Alerta";

const Listado = () => {
  const { superheroes, equipo, agregarSuperheroeAlEquipo } = useContext(superheroesContext);

  const { mostrarAlerta } = useContext(alertaContext);

  const agregarSuperheroe = async superheroe => {
    //validamos que no este en el equipo
    const superheroeEncontrado = equipo.filter( superheroeEquipo => superheroeEquipo.id === superheroe.id)
    if( superheroeEncontrado.length === 1 ){
        //el superhéroe ya esta en el equipo
        mostrarAlerta('El superhéroe ya esta en el equipo')
        return;
    }

    //validamos si el equipo esta lleno o no
    if( equipo.length === 6 ){
        //equipo lleno
        mostrarAlerta('El equipo ya esta lleno')
        return;
    }

    //filtramos los superheroes que tengan la misma condicion( bueno/malo ) del que quiere ingresar
    //y guardamos en la variable la longitud del array
    const cantidadDeBuenosOMalos = equipo.filter( superheroeDelEquipo => superheroeDelEquipo.biography.alignment === superheroe.biography.alignment).length;

    //validamos si se puede agregar un superheroe bueno o malo
    if( cantidadDeBuenosOMalos === 3 ){
        //no hay lugar para malos/buenos en el equipo
        mostrarAlerta(`No hay lugar para un superhéroe ${superheroe.biography.alignment} en el equipo`)
        return;
    }

    agregarSuperheroeAlEquipo(superheroe);
    mostrarAlerta("Se ha agregado correctamente al equipo");
  }

  return (
    <Fragment>
      <div className='principal bg-light'>
        <Alerta/>
        <Header/>
          <main className="container">
            <section className="d-flex flex-wrap my-3">
              {/* Si no hay superheroes encontrados */}
              { !superheroes ?
                  <div className='col-12 text-center'>No hay resultados para esa búsqueda</div>
                :
                superheroes.map((superheroe) => (
                  <div className="card superheroe p-3 shadow" key={superheroe.id}>
                    <img src={superheroe.image.url} className="card-img-top" alt="..." />
                    <div className="card-body text-center">
                      <h3>{superheroe.name}</h3>
                    </div>
                    <div>
                      <button 
                        className='btn btn-dark w-100'
                        onClick={() => agregarSuperheroe(superheroe)}
                      >Agregar al equipo</button>
                    </div>
                  </div>
                ))
              }
            </section>
          </main>
      </div>
      <Footer/>
    </Fragment>
  );
};

export default Listado;
