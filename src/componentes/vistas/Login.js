import React, {useContext, useEffect} from "react";
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import authContext from "../../context/autenticacion/authContext";
import alertaContext from "../../context/alerta/alertaContext";

//funcion para validar el formulario
const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Campo obligatorio';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Email invalido';
    }
  
    if (!values.password) {
      errors.password = 'Campo obligatorio';
    }
  
    return errors;
  };

const Login = () => {

  const history = useHistory();

  const { mensaje, nroMensaje, autenticado, iniciarSesion } = useContext(authContext);
  const { alerta, mostrarAlerta } = useContext(alertaContext)

  // para que redirija al home cuando este autenticado
  useEffect(() => {
    if( autenticado ){
      history.push('/');
    }
  }, [autenticado])

  
  // Para mostrar el mensaje cuando cambie su state
  useEffect(() => {
    mostrarAlerta(mensaje);
  }, [nroMensaje])

  


  //formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async values => {
       iniciarSesion( values.email, values.password );
    },
  });


  return (
    <div className="container-fluid m-0 bg-rojo">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center vh-100">

          <form className="bg-light rounded-3 p-3 login" onSubmit={formik.handleSubmit}>
            <h2 className='text-center my-3'>Iniciar Sesión</h2>

            <div className="form-group row mb-3">
              <label className="col-3 form-label">Email</label>
              <div className='col-9'>
                <input 
                  type="text" 
                  name="email" 
                  className="form-control"
                  placeholder='Ingrese su email'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? 
                (<div className='text-danger'>{formik.errors.email}</div>) : null}
              </div>

            </div>

            <div className="form-group row mb-3">
              <label className="form-label col-3">Password</label>
              <div className='col-9'>
                <input 
                type="password" 
                name="password" 
                className="form-control"
                placeholder='Ingrese su password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? 
                (<div className='text-danger'>{formik.errors.password}</div>) : null}
              </div>

            </div>

            { alerta ? <div className='alert alert-danger'>{alerta}</div> : null}

            <button type="submit" className="btn btn-dark w-100">
              Ingresar
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
