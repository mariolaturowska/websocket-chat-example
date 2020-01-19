import React from 'react';
import ColorContextProvider from "../contexts/colorContext";
import CanvasContextProvider from "../contexts/canvasContext";
import Message from "./message";
import MessagesContextProvider from "../contexts/messagesContext";

const Main = () => {
    return (
        <div className="main">
            <ColorContextProvider>
                <CanvasContextProvider>
                    <MessagesContextProvider>
                        <Message/>
                    </MessagesContextProvider>
                </CanvasContextProvider>
            </ColorContextProvider>
        </div>
    )
};

export default Main;