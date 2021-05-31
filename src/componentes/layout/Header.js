import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import superheroesContext from "../../context/superheroes/superheroesContext";

//Funcion para validar el buscador
const validate = (values) => {
  const errors = {};
  if (!values.superheroe) {
    errors.superheroe = "Este campo es obligatorio";
  }

  return errors;
};

const Header = () => {

  const history = useHistory()

  const { buscarSuperheroesPorNombre } = useContext(superheroesContext)

  //formik
  const formik = useFormik({
    initialValues: {
      superheroe: "",
    },
    validate,
    onSubmit: async values => {

      //buscamos el superheroe en la API
      await buscarSuperheroesPorNombre(values.superheroe)

      //redirigimos a listado
      history.push('/superheroe/listado');
    },
  });

  return (
    <div className="bg-rojo">
      <header className="container d-flex flex-column flex-sm-row justify-content-between py-2 py-sm-4">
        <Link to="/" className="text-white text-center h2">
          App Superhéroes
        </Link>

        <form className="my-2 my-lg-0" onSubmit={formik.handleSubmit}>
          <div className="d-flex">
            <input
              className="form-control me-1"
              type="text"
              placeholder="Buscar superhéroe"
              name="superheroe"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.superheroe}
            />
            <button className="btn btn-dark" type="submit">
              Buscar
            </button>
          </div>
          {formik.touched.superheroe && formik.errors.superheroe ? (
            <div className="text-white">{formik.errors.superheroe}</div>
          ) : null}
        </form>
      </header>
    </div>
  );
};

export default Header;
