import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import HomePage from './components/HomePage/HomePage';
import PowerballGame from './components/Lottery/Lottery';
import Roulette from './components/Roulette/Roulette';
import SlotGame from './components/Slot/Slot';

const App = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/lottery" component={PowerballGame} />
            <Route path="/roulette" component={Roulette} />
            <Route path="/slot" component={SlotGame} />
        </Switch>
    </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
