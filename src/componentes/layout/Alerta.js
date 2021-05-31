import React, { Fragment, useContext } from 'react';
import alertaContext from "../../context/alerta/alertaContext";

const Alerta = () => {

    const { alerta } = useContext(alertaContext);
  
    return ( 
        <Fragment>
            { !alerta ? null : <div className='alerta alert-warning'>{alerta}</div> }
        </Fragment>
     );
}
 
export default Alerta;