import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom" 
import './App.css';

import Home from "./components/Home/Home.js"
import Explore from "./components/Explore/Explore.js"
import Create from "./components/Create/Create.js"

function App() {
    return (
        <Router>
            <div className="app">
                <nav className="app__nav">
                    <Link to="/Explore" className="app__link">
                        <p>EXPLORE</p>
                    </Link>
                    <Link to="/" className="app__title">
                        <h1>PLAT</h1>
                    </Link>
                    <Link to="/Create" className="app__link">
                        <p>CREATE</p>
                    </Link>
                </nav>
                <div className="app__content">
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/explore" exact>
                            <Explore />
                        </Route>
                        <Route path="/create" exact>
                            <Create />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
