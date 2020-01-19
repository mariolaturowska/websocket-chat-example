import React from 'react';
import {IoIosSend} from "react-icons/io";
import {CanvasContext} from "../contexts/canvasContext";

const ButtonSubmit = ({fontColor, clickHandler}) => (
    <CanvasContext.Consumer>{(canvasContext) => {
        const {canvasImage, canvasRef, clearCanvasImage} = canvasContext;
        return (
            <IoIosSend onClick={() =>
                clickHandler(fontColor, canvasImage, canvasRef, clearCanvasImage)}
                       color='grey'
                       size='1.5em'
                       className='submit-button'/>)
    }}
    </CanvasContext.Consumer>
);

export default ButtonSubmit;