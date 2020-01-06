import React from 'react';
import ColorContextProvider from "../contexts/colorContext";
import CanvasContextProvider from "../contexts/canvasContext";
import Message from "./message";

const Main = () => {
    return (
        <div className="main">
                <ColorContextProvider>
                    <CanvasContextProvider>
                        <Message/>
                    </CanvasContextProvider>
                </ColorContextProvider>
        </div>
    )
};

export default Main;