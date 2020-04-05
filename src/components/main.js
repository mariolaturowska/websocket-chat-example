import React from 'react';
import ColorContextProvider from "../contexts/colorContext";
import CanvasContextProvider from "../contexts/canvasContext";
import Message from "./message";
import MessagesContextProvider from "../contexts/messagesContext";
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import LoginPage from './loginPage.js';
import LoginContextProvider from "../contexts/loginContext";

const Main = () => {
    return (
        <div className="main">
            <ColorContextProvider>
                <LoginContextProvider>
                    <CanvasContextProvider>
                        <MessagesContextProvider>
                            <Router>
                                <Switch>
                                    <Route exact path="/" component={LoginPage}/>
                                    <Route path="/messages" component={Message}/>
                                </Switch>
                            </Router>
                        </MessagesContextProvider>
                    </CanvasContextProvider>
                </LoginContextProvider>
            </ColorContextProvider>
        </div>
    )
};

export default Main;