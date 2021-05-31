import Login from "./componentes/vistas/Login";
import AlertaState from "./context/alerta/alertaState";
import AuthState from "./context/autenticacion/authState";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./componentes/vistas/Home";
import SuperheroesState from "./context/superheroes/superheroesState";
import Listado from "./componentes/vistas/Listado";
import Perfil from "./componentes/vistas/Perfil";
import RutaPrivada from "./componentes/RutaPrivada";

function App() {

  return (
    <SuperheroesState>
      <AlertaState>
        <AuthState>
          <Router>
            <Switch>
              <Route path="/login" component={Login}/>
              <RutaPrivada path="/superheroe/listado" component={Listado}/>
              <RutaPrivada path="/superheroe/perfil/:id" component={Perfil}/>
              <RutaPrivada path="/" component={Home}/>
            </Switch>
          </Router>
        </AuthState>
      </AlertaState>
    </SuperheroesState>
  );
}

export default App;
