import React, { useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import authContext from '../context/autenticacion/authContext';

const RutaPrivada = ({component: Component, props }) => {

    const { autenticado, comprobarAutenticacion } = useContext(authContext);

    //comprobamos si es valido el token
    useEffect(() => {
        const token = localStorage.getItem('token');

        comprobarAutenticacion(token)
    },[autenticado])

    return ( 
        <Route {...props} render={ props =>  autenticado ? 
            (
                <Component {...props} />
            )
            :
            (
                <Redirect to='/login'/>
            )
        }/>
     );
}
 
export default RutaPrivada;