import { useReducer } from 'react';
import axios from 'axios';
import superheroesReducer from './superheroesReducer';
import SuperheroesContext from './superheroesContext';
import { ACTUALIZAR_ESTADISTICAS_EQUIPO, ACTUALIZAR_ESTADISTICA_MAXIMA, AGREGAR_SUPERHEROE_EQUIPO, ELIMINAR_SUPERHEROE_EQUIPO, TRAER_HEROES_API } from '../../types';

const SuperheroesState = props => {

    const estadoInicial = ({
        superheroes: [],
        equipo: [],
        estadisticas: {
            inteligencia: 0,
            fuerza: 0,
            velocidad: 0,
            poder: 0,
            durabilidad: 0,
            combate: 0,
            alturaPromedio: 0,
            pesoPromedio: 0,
        },
        estadisticaMaxima: 'Desconocida'
    });

    const [state, dispatch] = useReducer(superheroesReducer, estadoInicial);

    const buscarSuperheroesPorNombre = async nombre => {
        try {
            //enviamos la peticion
            const respuesta = await axios.get(`https://superheroapi.com/api/10220592056856680/search/${nombre}`)
            const resultado = respuesta.data.results;
            
            dispatch({
                type: TRAER_HEROES_API,
                payload: resultado
            })

        } catch (error) {
            console.log(error)
        }
    }
  
    const agregarSuperheroeAlEquipo = superheroe => {
        //Agregamos el heroe al equipo
        dispatch({
            type: AGREGAR_SUPERHEROE_EQUIPO,
            payload: superheroe
        })

        actualizarEstadisticas();
        actualizarEstadisticaMaxima();
    }

    const eliminarSuperheroeDelEquipo = superheroe => {
        dispatch({
            type: ELIMINAR_SUPERHEROE_EQUIPO,
            payload: superheroe
        })

        actualizarEstadisticas();
        actualizarEstadisticaMaxima();
    }

    const actualizarEstadisticas = () => {
        dispatch({
            type: ACTUALIZAR_ESTADISTICAS_EQUIPO
        })
    }

    const actualizarEstadisticaMaxima = () => {
        dispatch({
            type: ACTUALIZAR_ESTADISTICA_MAXIMA
        })
    }

    return (
        <SuperheroesContext.Provider
            value={{
                superheroes: state.superheroes,
                equipo: state.equipo,
                estadisticas: state.estadisticas,
                estadisticaMaxima: state.estadisticaMaxima,
                buscarSuperheroesPorNombre,
                agregarSuperheroeAlEquipo,
                eliminarSuperheroeDelEquipo
            }}
        >{props.children}</SuperheroesContext.Provider>
    )
}

export default SuperheroesState;