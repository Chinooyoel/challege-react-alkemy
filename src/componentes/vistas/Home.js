import React, { Fragment } from "react";
import Estadistica from "../Estadistica";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Equipo from "../Equipo";
import Alerta from "../layout/Alerta";


const Home = () => {

  return (
    <Fragment>
      <div className='principal bg-light'>
        <Alerta/>
        <Header />

        <main className="container">        
          <Estadistica/>
          <Equipo/>
        </main>

      </div>
      <Footer/>
    </Fragment>
  );
};

export default Home;
