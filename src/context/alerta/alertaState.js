import { useReducer } from 'react';
import alertaReducer from './alertaReducer';
import AlertaContext from './alertaContext';
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types';

const AlertaState = props => {

    const estadoInicial = ({
        alerta: null
    });

    const [state, dispatch] = useReducer(alertaReducer, estadoInicial);
  
    const mostrarAlerta = mensaje => {

        dispatch({
            type: MOSTRAR_ALERTA,
            payload: mensaje
        })

        //ocultamos la alerta despues de 5 segundos
        setTimeout(() => {

            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000);

    }
    return (
        <AlertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >{props.children}</AlertaContext.Provider>
    )
}

export default AlertaState;