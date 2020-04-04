import React from 'react';
import {IoIosSend} from "react-icons/io";
import {CanvasContext} from "../contexts/canvasContext";
import {LoginContext} from "../contexts/loginContext";

const ButtonSubmit = ({fontColor, clickHandler}) => (
    <LoginContext.Consumer>{(loginContext) =>(
    <CanvasContext.Consumer>{(canvasContext) => {
        const {canvasImage, canvasRef, clearCanvasImage} = canvasContext;
        const {name} = loginContext;
        return (
            <IoIosSend onClick={() =>
                clickHandler(fontColor, canvasImage, canvasRef, clearCanvasImage,name)}
                       color='grey'
                       size='1.5em'
                       className='submit-button'/>)
    }}
    </CanvasContext.Consumer>
    )}</LoginContext.Consumer>
);

export default ButtonSubmit;