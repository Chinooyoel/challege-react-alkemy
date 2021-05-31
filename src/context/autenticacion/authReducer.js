
import {  AUTENTICACION_VALIDA, INICIAR_SESION, LOGIN_INVALIDO } from '../../types/index';

const authReducer = (state, action) => {
    switch(action.type) {
        case INICIAR_SESION:
            return {
                ...state,
                mensaje: null,
                autenticado: true
            }
        case LOGIN_INVALIDO:
            return {
                ...state,
                nroMensaje: state.nroMensaje + 1,
                mensaje: action.payload, 
            }
        case AUTENTICACION_VALIDA: 
            return{
                ...state,
                autenticado: true
            }
        default: 
            return state;
    }
}  

export default authReducer;