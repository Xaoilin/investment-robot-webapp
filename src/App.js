import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import About from "./components/about/About";
import Home from "./components/home/Home";
import SiteNavbar from "./components/navbar/SiteNavbar";
import StocksCalculator from "./components/calculator/StocksCalculator";

function App() {
    return (
        <Router>

            <SiteNavbar/>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/about">
                    <About/>
                </Route>
                <Route path="/stocks-calculator">
                    <StocksCalculator/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
