import React, {useState,useEffect} from 'react';
import './App.css';
import {subscribeToTimer} from './api';

const App = () => {
    const [timer, setTimer] = useState('');

    useEffect(() =>{
        subscribeToTimer((err, timestamp) => {
            setTimer(timestamp);
        });
    }, [timer]);

    return (
        <div className="App">
            <p>
                This is the timer value: {timer}
            </p>
        </div>
    );
};

export default App;

