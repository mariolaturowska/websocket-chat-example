import React from 'react';
import './App.css';
import Message from "./components/message";
import CanvasComponent from "./components/canvas";

const App = () => {
    return (
        <div className="App">
            <CanvasComponent/>
            <Message/>
        </div>
    );
};

export default App;

