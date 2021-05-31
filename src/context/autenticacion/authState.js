import { useReducer } from 'react';
import authReducer from './authReducer';
import AuthContext from './authContext';
import axios from 'axios';
import { INICIAR_SESION, LOGIN_INVALIDO, AUTENTICACION_VALIDA } from '../../types';

const AuthState = props => {

    const estadoInicial = ({
        autenticado: false,
        mensaje: null,
        nroMensaje: 0
    });

    const [state, dispatch] = useReducer(authReducer, estadoInicial);
  
    const iniciarSesion = async (email, password) => {
        try {
            //enviamos la peticion
            const respuesta = await axios.post('http://challenge-react.alkemy.org/', {email, password});
            const resultado = respuesta.data;

            //guardamos el token
            localStorage.setItem('token', resultado.token);

            dispatch({
                type: INICIAR_SESION,
            })

        } catch (error) {
            console.log(error.response.data.error)
            dispatch({
                type: LOGIN_INVALIDO,
                payload: error.response.data.error
            })
        }
    }

    const comprobarAutenticacion = token => {
        if( !token ){
            // Si no existe el token, no esta autenticado
            return;
        }

        //comprobamos en el server si el token es correcto

        //el token es valido
        dispatch({
            type: AUTENTICACION_VALIDA
        })
    }

    return (
        <AuthContext.Provider
            value={{
                autenticado: state.autenticado,
                mensaje: state.mensaje,
                nroMensaje: state.nroMensaje,
                iniciarSesion,
                comprobarAutenticacion
            }}
        >{props.children}</AuthContext.Provider>
    )
}

export default AuthState;