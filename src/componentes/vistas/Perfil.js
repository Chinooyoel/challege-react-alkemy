import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

const Perfil = (props) => {
  //obtener el id de la URL
  const id = props.location.pathname.split('/')[3];

  const [superheroe, setSuperheroe] = useState(null);
  const [error, setError ] = useState(null);

  useEffect(() => {
    const buscarSuperheroeEnLaApi = async (id) => {
      try {
        const respuesta = await axios.get(
          `https://superheroapi.com/api/10220592056856680/${id}`
        );
  
        //Si hay un error, actualizar el state error
        if( respuesta.data.response === 'error' ){
          setError(respuesta.data.error)
        }else{
          setSuperheroe(respuesta.data);
        }

      } catch (error) {
        console.log(error)
      }

    };

    buscarSuperheroeEnLaApi(id);
  }, []);

  return (
    <Fragment>
      <div className='principal bg-light'>
        <Header />
        <section className="container">
          <h3 className="text-center my-3">Perfil del superhéroe</h3>
          <div className="justify-content-center d-flex">
            {!superheroe ? (
              <Fragment>
                <h3>Perfil no encontrado</h3>
                <p>{error}</p>
              </Fragment>
            ) : (
              <div className="card superheroe p-3 shadow">
                <img
                  src={superheroe.image.url}
                  className="card-img-top"
                  alt={superheroe.name}
                />
                <div className="card-body text-center">
                  <h3>{superheroe.name}</h3>
                  <div className="row">
                    <div className="col-6 col-sm-12">
                      <p className="my-0">
                        <strong>Nombre:</strong>{superheroe.biography["full-name"]}
                      </p>
                      <p className="my-0">
                        <strong>Peso:</strong> {superheroe.appearance.weight[1]}
                      </p>
                      <p className="my-0">
                        <strong>Altura:</strong> {superheroe.appearance.height[1]}
                      </p>
                    </div>
                    <div className="col-6 col-sm-12">
                      <p className="my-0">
                        <strong>Color de ojos:</strong>{superheroe.appearance["eye-color"]}
                      </p>
                      <p className="my-0">
                        <strong>Color de cabello:</strong> {superheroe.appearance["hair-color"]}
                      </p>
                      <p className="my-0">
                        <strong>Lugar de trabajo:</strong> {superheroe.work.base}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Perfil;
