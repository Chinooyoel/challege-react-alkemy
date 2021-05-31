import {
    ACTUALIZAR_ESTADISTICAS_EQUIPO,
  AGREGAR_SUPERHEROE_EQUIPO,
  ELIMINAR_SUPERHEROE_EQUIPO,
  TRAER_HEROES_API,
  ACTUALIZAR_ESTADISTICA_MAXIMA
} from "../../types";

const obtenerTotalDeUnaEstadistica = (nombreEstadistica, equipo) => {
    let acum = 0;
  
    //recorremos el equipo
    for (let i = 0; i < equipo.length; i++) {
      //verificamos que la estadistica sea un Number, en caso que no lo sea saltamos el bucle
      if (isNaN(equipo[i].powerstats[nombreEstadistica])) {
        continue;
      }
  
      acum = acum + Number(equipo[i].powerstats[nombreEstadistica]);
    }
  
    return acum;
  };
  
  const obtenerPromedioDelEquipo = (nombrePropiedad, equipo) => {
    let acum = 0;
    const longitudDelEquipo = equipo.length;
  
    //terminamos la funcion si no hay miembros en el equipo y evitamos la division 0 / 0
    if (longitudDelEquipo === 0) return acum;
  
    for (let i = 0; i < longitudDelEquipo; i++) {
      //obtenemos la altura/peso en centrimetros/kilogramos, ejemplo de la altura '190 cm' / peso '100 kg';
      const propiedadDelSuperheroe = equipo[i].appearance[nombrePropiedad][1];
  
      //Dividimos el string '190 cm' y parseamos el numero a Number
      const propiedadDelSuperheroeNumber = Number(
        propiedadDelSuperheroe.split(" ")[0]
      );
  
  
      //verificamos que la estadistica sea un Number, en caso que no lo sea saltamos el bucle
      if (isNaN(propiedadDelSuperheroeNumber)) {
        continue;
      }
  
      acum = acum + propiedadDelSuperheroeNumber;
    }
  
    //para que aparezca 1 decimal
    return (acum / longitudDelEquipo).toFixed();
  };

const obtenerEstadisticaConMayorPuntaje = (estadisticas) => {
  const nombreEstadisticas = [
    "inteligencia",
    "fuerza",
    "velocidad",
    "poder",
    "durabilidad",
    "combate",
  ];
  let puntajeMaximo = 0;
  let nombreEstadisticaMaxima = "Desconocida";

  //recorremos las estadisticas
  for (let i = 0; i < nombreEstadisticas.length; i++) {
    //comparamos el puntaje de la estadistica con el puntaje mayor
    if (estadisticas[nombreEstadisticas[i]] > puntajeMaximo) {
      puntajeMaximo = estadisticas[nombreEstadisticas[i]];
      nombreEstadisticaMaxima = nombreEstadisticas[i];
    }
  }

  return nombreEstadisticaMaxima;
};

const superheroesReducer = (state, action) => {
  switch (action.type) {
    case TRAER_HEROES_API:
      return {
        ...state,
        superheroes: action.payload,
      };
    case AGREGAR_SUPERHEROE_EQUIPO:
      return {
        ...state,
        equipo: [...state.equipo, action.payload]
      };
    case ELIMINAR_SUPERHEROE_EQUIPO:
      return {
        ...state,
        //filtramos los superheroes que no tengan el mismo id del que se quiere robar
        equipo: state.equipo.filter(
          (superheroe) => superheroe.id !== action.payload.id
        )
        }
    case ACTUALIZAR_ESTADISTICAS_EQUIPO:
        return {
            ...state,
            estadisticas: {
                inteligencia: obtenerTotalDeUnaEstadistica("intelligence", state.equipo),
                fuerza: obtenerTotalDeUnaEstadistica("strength", state.equipo),
                velocidad: obtenerTotalDeUnaEstadistica("speed", state.equipo),
                poder: obtenerTotalDeUnaEstadistica("power", state.equipo),
                durabilidad: obtenerTotalDeUnaEstadistica("durability", state.equipo),
                combate: obtenerTotalDeUnaEstadistica("combat", state.equipo),
                alturaPromedio: obtenerPromedioDelEquipo("height", state.equipo),
                pesoPromedio: obtenerPromedioDelEquipo("weight", state.equipo),
            }
        }
    case ACTUALIZAR_ESTADISTICA_MAXIMA:
        return {
            ...state,
            estadisticaMaxima: obtenerEstadisticaConMayorPuntaje( state.estadisticas )
        }
    default:
      return state;
  }
};

export default superheroesReducer;
