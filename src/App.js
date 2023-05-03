import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Home,
  Error,
  Register,
  Login,
  Dashboard,
  ProtectedRoute,
} from "./pages";
import Navbar from "./components/Navbar";
import { useGlobalContext } from "./context";
function App() {
  const { isLoading } = useGlobalContext();
  if (isLoading) {
    return (
      <section className="page page-center">
        <div className="loading"></div>
      </section>
    );
  }
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <ProtectedRoute path="/dashboard" exact>
          <Dashboard />
        </ProtectedRoute>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
