import React from 'react';
import ColorContextProvider from "../contexts/colorContext";
import CanvasContextProvider from "../contexts/canvasContext";
import Message from "./message";
import MessagesContextProvider from "../contexts/messagesContext";
import {Route, BrowserRouter as Router} from 'react-router-dom'
import LoginPage from './login_page.js'

const Main = () => {
    return (

        <div className="main">
            <ColorContextProvider>
                <CanvasContextProvider>
                    <MessagesContextProvider>
                        <Router>
                            <Route exact path="/" component={LoginPage}/>
                            <Route path="/messages" component={Message}/>
                        </Router>
                    </MessagesContextProvider>
                </CanvasContextProvider>
            </ColorContextProvider>
        </div>

    )
};

export default Main;